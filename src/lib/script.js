function timeConverter(menit) {
  const hari = 60 * 24;
  const bulan = hari * 30;
  const tahun = bulan * 12;
  if (menit > tahun) return Math.round(menit / tahun) + "y";
  else if (menit > bulan) return Math.round(menit / bulan) + "m";
  else if (menit > hari) return Math.round(menit / hari) + "d";
  else if (menit > 60) return Math.round(menit / 60) + "h";
  else if (menit === 0) return "A few seconds ago";
  return "A few minutes ago";
}

function validExtension(ext, acceptableExts) {
  for (const acceptExt of acceptableExts) {
    if (acceptExt == ext) {
      return true;
    }
  }
}

export { timeConverter, validExtension };
