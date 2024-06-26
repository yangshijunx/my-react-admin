/**
 * 下载Base64图片方法
 * @param base64String - Base64编码的图片字符串
 * @param filename - 下载后的文件名
 */
const downloadBase64Image = (base64String: string, filename: string): void => {
  const link = document.createElement('a');
  link.href = base64String;
  link.download = filename || 'download.png';
  link.style.display = 'none';

  document.body.appendChild(link);
  link.click();

  // 清理
  document.body.removeChild(link);
};

/**
 * 下载Blob文件方法
 * @param blob - 要下载的Blob对象
 * @param filename - 下载后的文件名
 */
const downloadBlob = (blob: Blob, filename: string): void => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.style.display = 'none';

  document.body.appendChild(link);
  link.click();

  // 清理
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

export { downloadBase64Image, downloadBlob };
