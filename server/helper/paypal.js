const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id: "AZn5eCqR916jFesedozr1ckNB-CI7-MTZhuUa3IKdEikk62Zgcxrg6zV7ph7EfNpuY1fxgqR5MNtkZqz",
  client_secret: "ELV9uKu0Ewy-UlDp39TryCHiYMgxT4LdWum3n911CAcw1hDcmtjQIL87tx6-Op0HZbCRiP4M2znnud2A",
});

module.exports = paypal;
