function sessionCheck() {
  if (localStorage.length === 4) {
    window.location.replace(`${window.location.origin}/engineers`);
  }
}
function timeConverter(menit) {
  const hari = 60 * 24;
  const bulan = hari * 30;
  const tahun = bulan * 12;
  if (menit > tahun) return `${Math.round(menit / tahun)}y`;
  if (menit > bulan) return `${Math.round(menit / bulan)}m`;
  if (menit > hari) return `${Math.round(menit / hari)}d`;
  if (menit > 60) return `${Math.round(menit / 60)}h`;
  if (menit === 0) return 'A few seconds ago';
  return 'A few minutes ago';
}

function validExtension(ext, acceptableExts) {
  // eslint-disable-next-line no-restricted-syntax
  for (const acceptExt of acceptableExts) {
    if (acceptExt === ext) {
      return true;
    }
  }
  return false;
}

export { timeConverter, validExtension, sessionCheck };
