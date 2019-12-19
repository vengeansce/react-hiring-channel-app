function timeConverter(menit) {
  const hari = 60 * 24;
  const bulan = hari * 30;
  const tahun = bulan * 12;
  if (menit > tahun) return Math.round(menit / tahun) + " T";
  else if (menit > bulan) return Math.round(menit / bulan) + " B";
  else if (menit > hari) return Math.round(menit / hari) + " D";
  else if (menit > 60) return Math.round(menit / 60) + " H";
  return menit + " m";
}

export default timeConverter;
