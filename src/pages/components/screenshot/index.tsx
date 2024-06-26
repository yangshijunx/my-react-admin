import { Card, Button } from 'antd';
import domtoimage from 'dom-to-image';
import printJS from 'print-js';
import { CSSProperties, useEffect, useRef, useState } from 'react';

import { downloadBlob } from '@/utils/file';

import './index.scss';

export default function ShotScreen(): React.ReactElement {
  const expandElement = <div>{/* <p>截图</p> */}</div>;
  const shotScreenRef = useRef<HTMLDivElement>(null);
  // 截图保存的地址
  const [shotScreenUrl, setShotScreenUrl] = useState<string>('');
  // 需要打印的内容
  const shotScreenContent = useRef<HTMLElement | null>(null);

  useEffect(() => {
    shotScreenContent.current = document.body;
    if (shotScreenContent.current) {
      // console.log(shotScreenContent.current);
      // 删除 noscript 标签
      shotScreenContent.current.querySelectorAll('noscript').forEach((item) => {
        item.remove();
      });
    }
  }, []);
  // 统一按键样式
  const shotScreenBuyttonStyle: CSSProperties = {
    marginRight: '16px',
    display: 'inline-block',
  };

  // 截图操作
  const shotScreen = () => {
    // html2canvas 效果很差没解决掉更换为domtoimage
    // html2canvas(document.body).then((canvas) => {
    //   shotScreenRef.current!.appendChild(canvas);
    // });
    domtoimage
      .toPng(shotScreenContent.current as HTMLElement, { quality: 1 })
      .then((url: string) => {
        const img = new Image();
        setShotScreenUrl(url);
        img.src = url;
        shotScreenRef.current!.appendChild(img);
      });
  };
  // 删除截图
  const deleteScreen = () => {
    setShotScreenUrl('');
    shotScreenRef.current!.innerHTML = '';
  };
  // 打印截图
  const printScreen = () => {
    domtoimage.toBlob(shotScreenContent.current as HTMLElement).then((blob) => {
      const url = window.URL.createObjectURL(blob);
      printJS({ printable: url, type: 'image' });
    });
  };
  // 保存截图
  const saveScreen = () => {
    domtoimage.toBlob(shotScreenContent.current as HTMLElement).then((blob) => {
      downloadBlob(blob, '截图.png');
    });
  };

  return (
    <>
      <Card title="截图操作" extra={expandElement} style={{ width: 'auto', marginBottom: '20px' }}>
        <Button style={shotScreenBuyttonStyle} onClick={shotScreen} type="primary">
          截取当前body
        </Button>
        <Button
          disabled={shotScreenUrl === ''}
          onClick={() => deleteScreen()}
          style={shotScreenBuyttonStyle}
          type="primary"
        >
          删除截图
        </Button>
        <Button
          disabled={shotScreenUrl === ''}
          onClick={() => printScreen()}
          style={shotScreenBuyttonStyle}
          type="primary"
        >
          打印截图
        </Button>
        <Button
          disabled={shotScreenUrl === ''}
          onClick={saveScreen}
          style={shotScreenBuyttonStyle}
          type="primary"
        >
          保存截图
        </Button>
      </Card>
      <Card title="截图内容" style={{ width: 'auto' }}>
        <div ref={shotScreenRef} />
      </Card>
    </>
  );
}
