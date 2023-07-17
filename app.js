const express = require("express");
const app = express()
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose")

const uri = "mongodb+srv://admin-lokesh:LCp923FlPrq5LNFp@cluster0.yyxwlgs.mongodb.net/beautyDB";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB Atlas database connection established successfully");
});
//  --------------
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// ------------------------------------------------------contact page schema & model
const contactSchema = new mongoose.Schema({
  name: String,
  tel: Number,
  email: String,
  message: String
})
const Contact = mongoose.model("Contact", contactSchema)
// ---------------------------------------------------------signup page model & schema
const memberSchema = new mongoose.Schema({
  fname: String,
  organisation: String,
  email: String,
  type: String,
  address: String,
  pin: Number,
  state: String,
  about: String,
  facebookUrl: String,
  instaUrl: String,
  whatsappUrl: String
})

const Member = mongoose.model("Member", memberSchema)

app.get("/", (req, res) => {
  res.render("index")
})

app.get("/login", (req, res) => {
  res.render("login")
})

app.get("/contact", (req, res) => {
  res.render("contact")
})


app.post("/contact", async (req, res) => {
  try {
    let contact = new Contact({
      name: req.body.name,
      tel: req.body.tel,
      email: req.body.email,
      message: req.body.message
    })
    await contact.save()

    res.redirect("contact")
  } catch (err) {
    console.log(err)
  }

})

app.get("/signup", (req, res) => {
  res.render("signup")
})

app.post("/signup", async (req, res) => {
  try {
    const member = new Member({
      fname: req.body.fname,
      organisation: req.body.organisation,
      email: req.body.email,
      type: req.body.type,
      address: req.body.address,
      pin: req.body.pin,
      state: req.body.state,
      about: req.body.about,
      facebookUrl: req.body.facebookUrl,
      instaUrl: req.body.instaUrl,
      whatsappUrl: req.body.whatsappUrl
    })
    await member.save()
    res.redirect("signup")

  } catch (err) {
    console.log(err)
  }
})



app.get("/services", async (req, res) => {
  try {
    const members = await Member.find()
    res.render('service', { members: members })
  } catch (err) {
    console.log(err)
  }
})

app.post("/services", async (req, res) => {
  res.redirect("service")
})

app.get("/about", (req, res) => {
  res.render("about")
})

app.get("/compose/admin", async (req, res) => {
  try {
    const contacts = await Contact.find()
    const members = await Member.find()



    res.render('admin', { contacts: contacts, members: members })


  } catch (err) {
    console.log(err)
  }

})


app.post("/compose/admin", async (req, res) => {
  try {
    const getid = req.body.getid;
    const getmemberid = req.body.getmemberid;

    await Contact.findOneAndDelete({ _id: getid })
    await Member.findByIdAndDelete({ _id: getmemberid })

    console.log("sucesfully delete Query")

    res.redirect("admin")
  } catch (err) {
    console.log(err)
  }
})


app.post("/updatedetail", async (req, res) => {
  try {

    const newname = req.body.fullname
    const neworganisation = req.body.companyname
    const serviceId = req.body.serviceId;
    const members = await Member.find();

      await Member.findByIdAndUpdate({ _id: serviceId }, { organisation: neworganisation })
      await Member.findByIdAndUpdate({ _id: serviceId }, { fname: newname })
      // await Member.findByIdAndUpdateMany({ _id:serviceId }, { organisation: neworganisation })
      // await Member.findByIdAndUpdateMany({ _id:serviceId }, { organisation: neworganisation })
      // await Member.findByIdAndUpdateMany({ _id:serviceId }, { organisation: neworganisation })
      // await Member.findByIdAndUpdateMany({ _id:serviceId }, { organisation: neworganisation })
      // await Member.findByIdAndUpdateMany({ _id:serviceId }, { organisation: neworganisation })
      // await Member.findByIdAndUpdateMany({ _id:serviceId }, { organisation: neworganisation })
      // await Member.findByIdAndUpdateMany({ _id:serviceId }, { organisation: neworganisation })
      // await Member.findByIdAndUpdateMany({ _id:serviceId }, { organisation: neworganisation })

      // console.log("All updated")

      
      // console.log(serviceId + "srvice id this is correct")

    

    res.redirect("/compose/admin")
  }catch (err)
  { console.log(err)
  }
})

app.listen(4000, () => {
  console.log("server starting at port 4000.")
})