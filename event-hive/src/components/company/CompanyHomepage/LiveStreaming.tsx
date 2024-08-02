import { useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { sendNotification } from '../../../api/companyApi';

// Define types for the token response
interface TokenResponse {
    token: string;
}

// Function to generate a token
function generateToken(tokenServerUrl: string, userID: string): Promise<TokenResponse> {
    return fetch(`${tokenServerUrl}/access_token?userID=${userID}&expired_ts=7200`, {
        method: 'GET',
    }).then((res) => res.json());
}

// Function to generate a random ID
function randomID(len: number = 5): string {
    let result = '';
    const chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP';
    const maxPos = chars.length;
    for (let i = 0; i < len; i++) {
        result += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return result;
}

// Function to get URL parameters
// eslint-disable-next-line react-refresh/only-export-components
export function getUrlParams(url: string = window.location.href): URLSearchParams {
    const urlStr = url.split('?')[1] || '';
    return new URLSearchParams(urlStr);
}

// Define types for the parameters used with useParams
type Params = {
    eventId?: string;
};

// LiveStreaming component
function LiveStreaming() {
    const { eventId } = useParams<Params>();
    console.log('eventiddd=', eventId);

    const roomID = getUrlParams().get('roomID') || randomID(5);
    const url: string = `${window.location.origin}${window.location.pathname}?roomID=${roomID}`;

    useEffect(() => {
        const fetchData = async () => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
             await sendNotification(eventId as string, url);
            
        };
        fetchData();
    }, [eventId, url]);

    // Function to handle meeting setup
    const myMeeting = async (element: HTMLDivElement) => {
        const userID = randomID(5);
        const userName = randomID(5);
        // Generate token
        const tokenResponse = await generateToken('https://nextjs-token.vercel.app/api', userID);
        const token = ZegoUIKitPrebuilt.generateKitTokenForProduction(
            1484647939,
            tokenResponse.token,
            roomID,
            userID,
            userName
        );
        // Create instance object from token
        const zp = ZegoUIKitPrebuilt.create(token);

        // Start the call
        zp.joinRoom({
            container: element,
            scenario: {
                mode: ZegoUIKitPrebuilt.VideoConference,
            },
        });
    };

    return (
        <div
            className="myCallContainer"
            ref={(element) => {
                if (element) {
                    myMeeting(element);
                }
            }}
            style={{ width: '100vw', height: '100vh' }}
        ></div>
    );
}

export default LiveStreaming;
