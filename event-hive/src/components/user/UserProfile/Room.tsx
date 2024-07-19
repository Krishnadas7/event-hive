import { useEffect,useCallback, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { RootState } from '../../../app/store';
import { usePeer } from './Providers/PeerProvider';
import ReactPlayer from 'react-player'

function Room() {

  const {socket} = useSelector((state: RootState) => state.auth);
  const [remoteEmailId,setRemoteEmailId] = useState<any>()
  console.log('sokcet connecte',socket);
  const { peer,createOffer,createAnswer,setRemoteAnswer,sendStream,remotestream}:any = usePeer()
  console.log('remotestream',remotestream);
  
  const [mystream,setMyStream] = useState<any>(null)
  // const [remotestream,setRemoteStream] = useState<any>(null)

  

  const handleNewUserJoined = useCallback(
    async ({ emailId }:{emailId:string}) => {
      try {
        const offer = await createOffer();
        console.log('new user joined', emailId);
        socket.emit('call-user', { emailId, offer });
        setRemoteEmailId(emailId)
      } catch (error) {
        console.log('error handling in handlenew userjoined');
        
      }
     
    },
    [createOffer,socket] // Add dependencies here, if any
  );
    // useEffect(() => {
    //     socket.on('connection', () => {
    //       console.log('Socket connected');
    //       // socket.on('user-joined',handleNewUserJoined);
    //     });
    // },[socket])

    const handleIncomingCall = useCallback(async(data)=>{
      try {
        const {from,offer} = data
        console.log('incoming call from',from,offer)
      const ans = await createAnswer(offer)
      if(ans){
        socket.emit('call-accepted',{emailId:from,ans})
        setRemoteEmailId(from)
      }else{
        console.log("call accept error --------");
      }
      } catch (error) {
        console.log("error in incoming call --------", error);
      }
    },[createAnswer,socket])

    const handleCallAccepted = useCallback(async ({ ans }) => {
      try {
          console.log("Call accepted with answer:", ans);
          if (peer.signalingState === "have-local-offer") {
              await setRemoteAnswer(ans);
          } else {
              console.error("Invalid signaling state for setting remote answer:", peer.signalingState);
          }
      } catch (error) {
          console.error("Error handling call accepted:", error);
      }
  }, [peer, setRemoteAnswer]);


     const getUserMediaStream = useCallback(async () => {
      try {
          const stream = await navigator.mediaDevices.getUserMedia({
              audio: true,
              video: true
          });
          setMyStream(stream);
          sendStream(stream);
      } catch (error) {
          console.log(error, "-------------------------------");
      }
  }, [sendStream]);

  const handleNegotiation =useCallback(async()=>{
    const localOffer =await peer.createOffer()
    socket.emit('call-user',{emailId:remoteEmailId,offer:localOffer})
},[createOffer,remoteEmailId,socket])

    useEffect(() => {
      console.log('Setting up user-joined event listener');
        socket.on('user-joined',handleNewUserJoined);
        socket.on('incomming-call',handleIncomingCall)
        socket.on('call-accepted',handleCallAccepted)
       return ()=>{
        socket.off('user-joined',handleNewUserJoined);
        socket.off('incomming-call',handleIncomingCall)
        socket.off('call-accepted',handleCallAccepted)
       }
  },[socket,handleNewUserJoined,handleIncomingCall,handleCallAccepted]);

  useEffect(()=>{
    getUserMediaStream()
  },[getUserMediaStream])

  useEffect(()=>{
    peer.addEventListener('negotiationneeded',handleNegotiation)
     return () =>{
      peer.removeEventListener('negotiationneeded',handleNegotiation)
     }
  },[handleNegotiation,peer])

  return (
    <div>
      <h1>dskljds</h1>
      <h1>your are connected to {remoteEmailId}</h1>
        <button onClick={(e)=> sendStream(mystream)}>send my video</button>
      <ReactPlayer url={mystream} playing muted/>
      <ReactPlayer url={remotestream} playing muted/>
    </div>

  )
}

export default Room