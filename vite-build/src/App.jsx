import './App.css'
import { useEffect, useState } from 'react'
import {duration} from "@mui/material";

function App() {

    const tapeAudio = new Audio('/public/sounds/play.mp3');
    const maxLength = 128;

    const [ isPlaying, setIsPlaying ] = useState(false);
    const [ playIcon, setPlayIcon ] = useState(<>&#x23F5;</>);
    const [ leftReel, setLeftReel ] = useState(0);
    const [ rightReel, setRightReel ] = useState(0);
    const [ song, setSong ] = useState(new Audio('/public/sounds/love.mp3'));

    function play_pause () {
        setIsPlaying(playing => !playing);
    }

    const updateReels = () => {
        const durationRatio = song.currentTime / song.duration;
        console.log(durationRatio);
        if (durationRatio !== Infinity) {
            setLeftReel(Math.floor(maxLength * (1 - durationRatio)));
            setRightReel(Math.floor(maxLength * durationRatio));
        }
    }

    useEffect(() => {
        switch(isPlaying) {
            case true:
                tapeAudio.play();
                setPlayIcon(playIcon => <>&#x23F8;</>);
                song.play();
                break;

            case false:
                tapeAudio.play();
                setPlayIcon(playIcon => <>&#x23F5;</>);
                song.pause();
                break;
        }
    }, [isPlaying]);

    useEffect(() => {
        song.addEventListener('timeupdate', updateReels)
        song.addEventListener('ended', () => {
            tapeAudio.play();
            setIsPlaying(false);
        })

        return () => {
            song.removeEventListener('timeupdate', updateReels);
            song.removeEventListener('ended', () => {
                tapeAudio.play();
                setIsPlaying(false);
            })
        }
    }, [song, maxLength])

    const leftReelStyle = {
        width: leftReel + 'px'
    }

    const rightReelStyle = {
        width: rightReel + 'px'
    }

  return (
      <div className={'content'}>
          <div className={'cassette-container'}>
              <div className={'cassette-body'}>
                  <div className="dots"></div>
                  <div className="dots"></div>
                  <div className="dots"></div>
                  <div className="dots"></div>
                  <div className="label">
                      <div className="label-descp">
                          <div className="line"></div>
                          <div className="line"></div>
                      </div>
                      <div className="player">
                          <div className="tape">
                              <div className={`circle ${isPlaying ? 'circle-spin' : ''}`}>
                                  <div className="teeth"></div>
                                  <div className="teeth"></div>
                                  <div className="teeth"></div>
                                  <div className="teeth"></div>
                              </div>
                              <div className="visor">
                                  <div className="reel1" style={leftReelStyle}></div>
                                  <div className="reel2" style={rightReelStyle}></div>
                              </div>
                              <div className={`circle ${isPlaying ? 'circle-spin' : ''}`}>
                                  <div className="teeth"></div>
                                  <div className="teeth"></div>
                                  <div className="teeth"></div>
                                  <div className="teeth"></div>
                              </div>
                          </div>
                      </div>
                      <div className="label-color"></div>
                  </div>
              </div>

              <div className={'media-panel'}>
                  <button className={'play-button'} onClick={() => play_pause()}
                          >{playIcon}</button>
              </div>
          </div>
      </div>
  )
}

export default App
