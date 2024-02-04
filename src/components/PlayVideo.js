import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import useMovieVideos from '../hooks/useMovieVideos'
import { useNavigate, useParams } from 'react-router-dom'
import GPTFLIX from "../utils/images/GPTFLIX.png"
// import YouTube from 'react-youtube';
// import ReactPlayer from 'react-player';
// import video1 from "../utils/videos/video1.mp4"


const PlayVideo = () => {
    const movieVideos = useSelector(store => store.movies?.movieVideos)
    const params = useParams()
    const navigate = useNavigate();
    const movieId = params.id
    const [videoId, setVideoId] = useState(null)
    useMovieVideos({movieId})

    useEffect(()=>{
      window.scroll(0,0,)
      // movieVideos && !videoId && setVideoId(movieVideos[0]?.id)
    }, [movieVideos, videoId])

    useEffect(()=>{
      window.scroll(0,0,)
      movieVideos && setVideoId(movieVideos[0]?.id)
    }, [movieVideos])

    // console.log(movieVideos)
    console.log(videoId)
  return (
    <div className='bg-black text-white'>
      <div className='absolute px-8 py-3 bg-gradient-to-b from-black z-50 w-full flex justify-between flex-col md:flex-row -top-16 md:-top-10'>
        <img className='w-48 mx-auto md:mx-0' src={GPTFLIX} alt='netflixLogo' onClick={() => navigate("/")} />
      </div>
    { movieVideos &&
    <div className='lg:pt-4'>
        <div className='overflow-x-hidden'>
            <iframe
            // className='w-screen aspect-video'
            className='w-full -mt-16'
            width="1200"
            height="700"
            src={`https://www.youtube.com/embed/${videoId}?si=05RGkzBUTwjLrmWU&autoplay=1&mute=0&loop=1&controls=1&rel=0&showinfo=0&modestbranding=0`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            // allowFullScreen
            ></iframe>

            {/* <video controls width="70%" className="videoPlayer"
            src={`https://www.youtube.com/embed/${movieVideos[0]?.key}?si=05RGkzBUTwjLrmWU&autoplay=1&mute=1&loop=1&controls=0&rel=0&showinfo=0&modestbranding=1`}
            ></video> */}
        </div>

        <div className='mt-12'>
          <h2 className='text-5xl font-bold ml-12'>More Videos</h2>
          <div className='flex flex-wrap justify-center bg-black bg-opacity-10'>
          {
            movieVideos?.map(video => <div className='w-72 m-2' key={video?.id} onClick={()=> setVideoId(video?.id)}>
              <img className='w-full' alt="" src={video?.snippet?.thumbnails?.standard?.url} />
              <h2 className='font-bold text-sm -mt-6'>{video?.snippet?.title}</h2>
            </div>)
          }
          </div>
        </div>
      </div>
    }
    </div>
  )
}



// const PlayVideo = () => {
//     const movieVideos = useSelector(store => store.movies?.movieVideos)
//     const params = useParams()
//     const movieId = params.id
//     console.log(movieId)
//     useMovieVideos({movieId})

//     // if(!movieVideos) return <div>Loading</div>

//     const videoId = "22bLNq6iCjU" // movieVideos[0]?.key

//   useEffect(() => {
//     // Load the YouTube IFrame Player API code asynchronously
//     const tag = document.createElement('script');
//     tag.src = 'https://www.youtube.com/iframe_api';
//     const firstScriptTag = document.getElementsByTagName('script')[0];
//     firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//     let player;

//     // Define the onYouTubeIframeAPIReady callback
//     window.onYouTubeIframeAPIReady = () => {
//       player = new window.YT.Player('youtube-player', {
//         videoId,
//         playerVars: {
//           autoplay: 1,
//           mute: 0,
//           loop: 1,
//           controls: 0,
//           modestbranding: 1,
//           rel: 0,
//           showinfo: 0
//         },
//         events: {
//           onReady: (event) => {
//             // You can perform additional actions when the player is ready
//           }
//         }
//       });
//     };

//     return () => {
//       // Cleanup function
//       if (player) {
//         player.destroy();
//       }
//     };
//   }, [videoId]);

//   return (
//     <div>
//       <h2>YouTube Video Example</h2>
//       <div id="youtube-player"></div>
//     </div>
//   );
// };



// const PlayVideo = () => {
//     const videoId = "22bLNq6iCjU"
//   const opts = {
//     height: '400',
//     width: '600',
//     playerVars: {
//       autoplay: 1,
//       controls: 1,
//     //   modestbranding: 1 ,
//       loop: 1,
//       rel: 0,
//       showinfo: 0,
//     },
//   };

//   const onReady = (event) => {
//     // You can perform additional actions when the player is ready
//   };

//   return (
//     <div>
//       <h2>YouTube Video Example</h2>
//       <YouTube videoId={videoId} opts={opts} onReady={onReady} />
//     </div>
//   );
// };




// const CustomControls = ({ play, pause }) => {
//     return (
//       <div>
//         <button onClick={play}>Play</button>
//         <button onClick={pause}>Pause</button>
//       </div>
//     );
//   };
// const PlayVideo = () =>{

//     const [play, setplay] = useState(true)

//     const handleOnPlay = () => {
//         console.log('Video started playing');
//       };
    
//       const handleOnEnded = () => {
//         console.log('Video ended');
//       };

//       const youtubeConfig = {
//         youtube: {
//           playerVars: {
//             modestbranding: 0,
//             controls: 1,
//             showinfo: 0,
//           },
//         },
//       };


//     return (
//         <div>
//         <h2>Video Player Example</h2>
//         <ReactPlayer
        
//           url ={`https://www.youtube.com/embed/22bLNq6iCjU?si=05RGkzBUTwjLrmWU&autoplay=1&mute=0&loop=1&controls=1&rel=0&showinfo=0&modestbranding=1`}
//           //url={`https://www.youtube.com/embed/22bLNq6iCjU`} //https://www.youtube.com/watch?v=22bLNq6iCjU
//         // url={video1}
//           controls={true}
//           playing={true}
//         //   playing={play}
//           volume={0.8}
//           width="800px"
//           height="450px"

//         //   onPlay={handleOnPlay}
//         //   onEnded={handleOnEnded}

//         //   config={youtubeConfig}
//         />
//         <CustomControls />
//       </div>
//     )
// }


export default PlayVideo;
