const generateSlug = (text) => {
  // Chuyển đổi các ký tự tiếng Việt sang Latin
  const slug = text
    ?.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
  return slug;
};

module.exports = generateSlug;
