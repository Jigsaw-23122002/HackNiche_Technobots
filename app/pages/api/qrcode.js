import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const options = {
      method: "GET",
      url: "https://qrcodeutils.p.rapidapi.com/qrcodefree",
      params: {
        text: req.query.input,
        validate: "true",
        size: "150",
        type: "svg",
        level: "M",
      },
      headers: {
        "X-RapidAPI-Key": "0afbe986b8msh43b88b81e1fea1ap1350f5jsn337b6d720805",
        "X-RapidAPI-Host": "qrcodeutils.p.rapidapi.com",
      },
    };
    axios
      .request(options)
      .then(function (response) {
        res.status(200).json(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  } else {
    res.status(400);
  }
}
