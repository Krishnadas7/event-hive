// import React,{useCallback, useEffect, useMemo, useState} from 'react'

// const peerContext = React.createContext(null)
// export const usePeer = () =>React.useContext(peerContext)
// export const PeerProvider = (props) =>{

//     const [remotestream,setRemoteStream]=useState<any>(null)

//     const peer = useMemo(()=> new RTCPeerConnection({
//         iceServers:[
//             {
//                 urls: ["stun:stun.l.google.com:19302", "stun:stun1.l.google.com:19302"],
//             },
//         ]
//     })
      
//     ,[])
//     const createOffer = async () =>{
//         const offer = await peer.createOffer()
//         await peer.setLocalDescription(new RTCSessionDescription(offer));
//         return offer
//     }

//     const createAnswer =  async (offer) =>{
//         await peer.setRemoteDescription(offer)
//         const answer =await peer.createAnswer()
//         await peer.setLocalDescription(new RTCSessionDescription(answer));
//         return answer
//     }


//     const setRemoteAnswer = async (ans) =>{
//         try{
//             await peer.setRemoteDescription(new RTCSessionDescription(ans));
//         }catch(error){
//            console.log('===errro from peer',error);
           
//         }
        
//     }
//     const sendStream = (stream) => {
//         if (stream) {
//             stream.getTracks().forEach((track) => {
//                 peer.addTrack(track, stream);
//             });
//         } else {
//             console.error("No stream to send.");
//         }
//     };

//     const handleTrackEvent = useCallback((ev)=>{
//         try {
//             const streams = ev.streams
//         console.log('streams  ',streams);
        
//         setRemoteStream(streams[0])
//         } catch (error) {
//             console.log(error, "handleTrackEvent")
//         }
        
//     },[])
  
//     useEffect(()=>{
//         peer.addEventListener('track',handleTrackEvent)
//         return ()=>{
//             peer.removeEventListener('track',handleTrackEvent)
//         }
//     },[handleTrackEvent,peer])

//     return (
//         <peerContext.Provider value={{peer,
//             createOffer,
//             createAnswer,
//             setRemoteAnswer,
//             sendStream,
//             remotestream
//         }}>{props.children}</peerContext.Provider>
//     )
// }