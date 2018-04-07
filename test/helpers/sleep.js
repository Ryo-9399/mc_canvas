/**
 * setTimeoutを使って一定時間待つPromiseを返します。
 */
export function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}
