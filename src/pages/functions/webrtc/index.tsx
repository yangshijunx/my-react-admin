import { Card, Button } from 'antd';
import { useEffect, useState } from 'react';
import Player from 'xgplayer';
import LivePreset from 'xgplayer/es/presets/live';
import 'xgplayer/dist/index.min.css';

import './index.scss';

const gridStyle: React.CSSProperties = {
  textAlign: 'center',
};
function WebRTC() {
  // 播放器实例
  const [player, setPlayer] = useState<Player | null>(null);
  // 播放器实例
  useEffect(() => {
    const player = new Player({
      id: 'webrtc',
      url: '',
      width: '100%',
      autoplay: true,
      poster:
        'https://gd-hbimg.huaban.com/af32e20730c0efb7f4e29d00e54a5d7d96520fa4582ed-Y6VbNP_fw1200webp',
      presets: [LivePreset],
    });
    setPlayer(player);
    return () => {
      player.destroy();
    };
  }, []);
  // 直播状态
  const [recording, setRecording] = useState<boolean>(false);
  // const videoRef = useRef<HTMLVideoElement | null>(null);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);

  // 开始直播
  const startRecording = async () => {
    if (recording) {
      mediaStream?.getTracks().forEach((track) => track.stop());
      setMediaStream(null);
      setRecording(false);
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia();
      setMediaStream(stream);
      // if (videoRef.current) {
      //   videoRef.current.srcObject = stream;
      //   videoRef.current.play();
      // }
      if (player?.video instanceof HTMLVideoElement) {
        player.autoplay = true;
        player.video.srcObject = stream;
        // @ts-ignore
        // player.attachVideo();
      }
      setRecording(true);
    } catch (error) {
      console.error('Error starting screen recording:', error);
    }
  };

  return (
    <Card title="WebRTC" className="webrtc-card">
      <Card.Grid style={gridStyle}>
        <Button type="primary" onClick={startRecording}>
          {recording ? '结束直播' : '开始直播'}
        </Button>
      </Card.Grid>
      <Card.Grid style={gridStyle}>
        <div>
          <h2>Recorded Video</h2>
          {/* <video ref={videoRef} controls>
            <track kind="captions" />
          </video> */}
          <div id="webrtc" />
        </div>
      </Card.Grid>
    </Card>
  );
}

export default WebRTC;
