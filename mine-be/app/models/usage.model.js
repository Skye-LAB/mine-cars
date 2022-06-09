module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
      bbm: Number,
      jarakTotal: Number,
      serviceHari: Date,
      serviceTerakhir: Date
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Usage = mongoose.model("usages", schema);

  return Usage;
};
