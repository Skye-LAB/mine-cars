module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
      employee: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
      agreing: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
      vehicle: { type: mongoose.Schema.Types.ObjectId, ref: "vehicles" },
      tglPinjam: Date,
      tglKembali: Date,
      status: Number // 0: not yet approved, 1: approved, 2: return
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Booking = mongoose.model("bookings", schema);

  return Booking;
};
