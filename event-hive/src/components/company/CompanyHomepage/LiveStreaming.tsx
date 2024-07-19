import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useParams } from 'react-router-dom';
import { sendNotification } from '../../../api/companyApi';
import { useEffect } from 'react';


function generateToken(tokenServerUrl:string, userID:string) {
    // Obtain the token interface provided by the App Server
    return fetch(
      `${tokenServerUrl}/access_token?userID=${userID}&expired_ts=7200`,
      {
        method: 'GET',
      }
    ).then((res) => res.json());
  }
  let arr=['saya','adw']
  function randomID(len:number) {
    let result = '';
    if (result) return result;
    var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
      maxPos = chars.length,
      i;
    len = len || 5;
    for (i = 0; i < len; i++) {
      result += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return result;
  }
  export function getUrlParams(
    url: string = window.location.href
  ): URLSearchParams {
    let urlStr = url.split('?')[1];
    return new URLSearchParams(urlStr);
  }


function LiveStreaming() {
    const { eventId } = useParams();
    console.log('eventiddd=',eventId)
    const roomID = getUrlParams().get('roomID') || randomID(5);
    const url:string = `${window.location.origin}${window.location.pathname}?roomID=${roomID}`

    useEffect(()=>{
       const fetchdata = async () =>{
        console.log('mail sending dsdfs')
         let res=await sendNotification(eventId as string,url)
         if(res?.data.success){
          console.log('sucessss===');
         }else{
          console.log('faileddd');
          
         }

       }
       fetchdata()
    },[])
    
    let myMeeting = async (element: HTMLDivElement) => {
    const userID = randomID(5);
    const userName = randomID(5)
    // generate token 
    generateToken('https://nextjs-token.vercel.app/api', userID).then((res) => {
      const token = ZegoUIKitPrebuilt.generateKitTokenForProduction(
        1484647939,
        res.token,
        roomID,
        userID,
        userName
      );
      // create instance object from token
      const zp = ZegoUIKitPrebuilt.create(token);

      // start the call
      zp.joinRoom({
        container: element,
        // sharedLinks: [
        //   {
        //     name: 'Personal link',
        //     url:
        //       window.location.origin +
        //       window.location.pathname +
        //       '?roomID=' +
        //       roomID,
        //   },
        // ],
        scenario: {
          mode: ZegoUIKitPrebuilt.VideoConference,
        },
      });  
    });
  };
  
  return (
    <div
    className="myCallContainer"
     ref={myMeeting}
     style={{ width: '100vw', height: '100vh' }}
     ></div>
  )
}

export default LiveStreaming