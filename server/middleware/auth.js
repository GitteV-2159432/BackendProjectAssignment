import passport from "passport";


router.get("/dashboard", passport.authenticate("jwt", { session: false }), (req, res) => {
  res.json({ name: req.user.firstName, email: req.user.email });
});
