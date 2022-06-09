module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
      plat: String,
      jenis: Number, // 0: barang, 1: orang
      merk: String,
      usage: { type: mongoose.Schema.Types.ObjectId, ref: "usages" }
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Vehicle = mongoose.model("vehicles", schema);

  return Vehicle;
};
