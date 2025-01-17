export const getEngTemplateOrder = ({
  restaurantName,
  userName,
  orderNumber,
  paymentMethod,
  orderId,
  restaurantEmail,
  restaurantPhone,
  cartList,
  total,
  pickupTime,
}: any) => {
  let row = ''
  cartList.forEach(({ name, price, qty }: any) => {
    row += `<tr>
        <td class="tg-0pky">${name}</td>
        <td class="tg-0pky">${price} x ${qty}</td>
        <td class="tg-0pky">€ ${price * qty}</td>
      </tr>`
  })
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html
  xmlns="http://www.w3.org/1999/xhtml"
  xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:o="urn:schemas-microsoft-com:office:office"
>
  <head>
    <!--[if gte mso 9]>
      <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG />
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
    <![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="x-apple-disable-message-reformatting" />
    <!--[if !mso]><!-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <!--<![endif]-->
    <title></title>

    <style type="text/css">
        .tg  {border-collapse:collapse;border-spacing:0;}
.tg td{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
  overflow:hidden;padding:10px 5px;word-break:normal;}
.tg th{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
  font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;}
.tg .tg-0pky{border-color:inherit;text-align:left;vertical-align:top}
.tg .tg-0lax{text-align:left;vertical-align:top}
      a {
        color: inherit !important;
        text-decoration: none !important;
      }

      @media only screen and (min-width: 620px) {
        .u-row {
          width: 600px !important;
        }
        .u-row .u-col {
          vertical-align: top;
        }

        .u-row .u-col-100 {
          width: 600px !important;
        }
      }

      @media (max-width: 620px) {
        .u-row-container {
          max-width: 100% !important;
          padding-left: 0px !important;
          padding-right: 0px !important;
        }
        .u-row .u-col {
          min-width: 320px !important;
          max-width: 100% !important;
          display: block !important;
        }
        .u-row {
          width: 100% !important;
        }
        .u-col {
          width: 100% !important;
        }
        .u-col > div {
          margin: 0 auto;
        }
      }
      body {
        margin: 0;
        padding: 0;
      }

      table,
      tr,
      td {
        vertical-align: top;
        border-collapse: collapse;
      }

      p {
        margin: 0;
      }

      .ie-container table,
      .mso-container table {
        table-layout: fixed;
      }

      * {
        line-height: inherit;
      }

      table,
      td {
        color: #000000;
      }
      #u_body a {
        color: #0000ee;
        text-decoration: underline;
      }
      @media (max-width: 480px) {
        #u_content_image_4 .v-src-width {
          width: auto !important;
        }
        #u_content_image_4 .v-src-max-width {
          max-width: 43% !important;
        }
        #u_content_heading_1 .v-container-padding-padding {
          padding: 8px 20px 0px !important;
        }
        #u_content_heading_1 .v-font-size {
          font-size: 21px !important;
        }
        #u_content_heading_1 .v-text-align {
          text-align: center !important;
        }
        #u_content_text_2 .v-container-padding-padding {
          padding: 35px 15px 10px !important;
        }
        #u_content_text_3 .v-container-padding-padding {
          padding: 10px 15px 40px !important;
        }
      }
    </style>

    <!--[if !mso]><!-->
    <link
      href="https://fonts.googleapis.com/css?family=Lato:400,700&display=swap"
      rel="stylesheet"
      type="text/css"
    />
    <link
      href="https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap"
      rel="stylesheet"
      type="text/css"
    />
    <script
      src="https://kit.fontawesome.com/0b023c5569.js"
      crossorigin="anonymous"
    ></script>

    <!--<![endif]-->
  </head>

  <body
    class="clean-body u_body"
    style="
      margin: 0;
      padding: 0;
      -webkit-text-size-adjust: 100%;
      background-color: #c2e0f4;
      color: #000000;
    "
  >
    <!--[if IE]><div class="ie-container"><![endif]-->
    <!--[if mso]><div class="mso-container"><![endif]-->


                        <!--[if (!mso)&(!IE)]><!-->
                      </div>
                      <!--<![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>

            <div
              class="u-row-container"
              style="padding: 0px; background-color: transparent; margin-top:20px"
            >
              <div
                class="u-row"
                style="
                  margin: 0 auto;
                  min-width: 320px;
                  max-width: 600px;
                  overflow-wrap: break-word;
                  word-wrap: break-word;
                  word-break: break-word;
                  background-color: #ffffff;
                "
              >
                <div
                  style="
                    border-collapse: collapse;
                    display: table;
                    width: 100%;
                    height: 100%;
                    background-color: transparent;
                  "
                >
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->

                  <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                  <div
                    class="u-col u-col-100"
                    style="
                      max-width: 320px;
                      min-width: 600px;
                      display: table-cell;
                      vertical-align: top;
                    "
                  >
                    <div
                      style="
                        height: 100%;
                        width: 100% !important;
                        border-radius: 0px;
                        -webkit-border-radius: 0px;
                        -moz-border-radius: 0px;
                      "
                    >
                      <!--[if (!mso)&(!IE)]><!--><div
                        style="
                          height: 100%;
                          padding: 0px;
                          border-top: 0px solid transparent;
                          border-left: 0px solid transparent;
                          border-right: 0px solid transparent;
                          border-bottom: 0px solid transparent;
                          border-radius: 0px;
                          -webkit-border-radius: 0px;
                          -moz-border-radius: 0px;
                        "
                      ><!--<![endif]-->
                        <table
                          id="u_content_text_2"
                          style="font-family: arial, helvetica, sans-serif"
                          role="presentation"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                class="v-container-padding-padding"
                                style="
                                  overflow-wrap: break-word;
                                  word-break: break-word;
                                  padding: 35px 55px 10px;
                                  font-family: arial, helvetica, sans-serif;
                                "
                                align="left"
                              >
                                <div
                                  class="v-text-align"
                                  style="
                                    color: #333333;
                                    line-height: 180%;
                                    text-align: left;
                                    word-wrap: break-word;
                                  "
                                >
                                  <div class="v-text-align" align="center">
                                    <a
                                      href="https://www.lowisy.com/"
                                      title="logo"
                                      target="_blank"
                                    >
                                   <img width="250" height="100" src="https://lowisy-dev.s3.eu-central-1.amazonaws.com/Lowisy_Restaurants_big.png" title="logo">
                                    </a>
                                  </div>
                                  <p style="font-size: 14px; line-height: 180%">
                                    &nbsp;
                                  </p>


                                  <p style="font-size: 14px; line-height: 180%">
                                    <span
                                      style="
                                        font-size: 18px;
                                        line-height: 32.4px;
                                        font-family: Lato, sans-serif;
                                      "
                                      ><strong
                                        ><span
                                          style="
                                            line-height: 32.4px;
                                            font-size: 20px;
                                          "
                                          >Thank you for your order at ${restaurantName}!
                                        </span>
                                      </strong></span
                                    >
                                  </p>
                                  <p style="font-size: 14px; line-height: 180%">
                                    &nbsp;
                                  </p>
                                  <p style="font-size: 14px; line-height: 180%">
                                    <span
                                      style="
                                        font-size: 18px;
                                        line-height: 32.4px;
                                        font-family: Lato, sans-serif;
                                      "
                                      ><span
                                          style="
                                            line-height: 32.4px;
                                            font-size: 18px;
                                          "
                                          ><strong>Hello ${userName}</strong><br/>Thank you very much for your order.
                                        </span>
                                     </span
                                    >
                                  </p>
                                  <p style="font-size: 14px; line-height: 180%">
                                    &nbsp;
                                  </p>
                                  <p style="font-size: 14px; line-height: 180%">
                                    <span
                                      style="
                                        font-size: 18px;
                                        line-height: 32.4px;
                                        font-family: Lato, sans-serif;
                                      "
                                      ><span
                                          style="
                                            line-height: 32.4px;
                                            font-size: 18px;
                                          "
                                          >${restaurantName} received your order, the order number is:<strong>${orderNumber}</strong><br/>
                                          Time to pickup/delivery was <strong> ${pickupTime}.</strong>
                                        </span>
                                     </span
                                    >
                                  </p>
                                  <p style="font-size: 14px; line-height: 180%">
                                    &nbsp;
                                  </p>
                                  <p style="font-size: 14px; line-height: 180%;text-align:center">
                                    <span
                                      style="
                                        font-size: 18px;
                                        line-height: 32.4px;
                                        font-family: Lato, sans-serif;
                                      "
                                      ><span
                                          style="
                                            line-height: 32.4px;
                                            font-size: 18px;
                                          "
                                          ><strong>You can find details of your order here</strong>
                                        </span>
                                        <a style="display:block;" href="https://uat-restaurant.lowisy.com/orders/${orderId}">view order</a>
                                     </span
                                    >
                                  </p>
                                  <p style="font-size: 14px; line-height: 180%">
                                    &nbsp;
                                  </p>
                                </div>
                                <table class="tg" align="center">
                                    <thead>
                                      <tr>
                                        <td align="center" colspan="3">${restaurantName}</td>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      
                                      ${row}
                                     
                                      <tr>
                                        <td class="tg-0pky">Total</td>
                                        <td class="tg-0pky"></td>
                                        <td class="tg-0pky">€ ${total}</td>
                                      </tr>
                                      <tr>
                                        <td class="tg-0pky" colspan="2">Payment method</td>
                                        <td class="tg-0pky" >${paymentMethod}</td>
                                      </tr>
                                    </tbody>
                                    </table>
                                    <p style="font-size: 14px; line-height: 180%">
                                      &nbsp
                                    </p>
                                  <p style="font-size: 14px; line-height: 180%; text-align:center">
                                      <span
                                        style="
                                          font-family: Lato, sans-serif;
                                          font-size: 20px;
                                          line-height: 28.8px;
                                        "
                                        ></span
                                      >
                                    </p>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <table
                          id="u_content_text_3"
                          style="font-family: arial, helvetica, sans-serif"
                          role="presentation"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                class="v-container-padding-padding"
                                style="
                                  overflow-wrap: break-word;
                                  word-break: break-word;
                                  padding: 10px 55px 40px;
                                  font-family: arial, helvetica, sans-serif;
                                "
                                align="left"
                              >
                                <div
                                  class="v-text-align"
                                  style="
                                    line-height: 170%;
                                    text-align: left;
                                    word-wrap: break-word;
                                  "
                                >
     
                                  <p style="font-size: 14px; line-height: 170%">
                                    <span
                                      style="
                                        font-family: Lato, sans-serif;
                                        font-size: 18px;
                                        line-height: 27.2px;
                                      "
                                      >Answers to many questions in the
                                      support area at:
                                      <a
                                        href="https://www.lowisy.com/suppor"
                                        target="_blank"
                                        >https://www.lowisy.com/support</a
                                      >&nbsp;</span
                                    >
                                  </p>

                                 
                                  <p style="font-size: 14px; line-height: 170%">
                                    <span
                                      style="
                                        font-family: Lato, sans-serif;
                                        font-size: 18px;
                                        line-height: 27.2px;
                                      "
                                      >Regards,</span
                                    >
                                  </p>
                                  <p style="font-size: 14px; line-height: 170%">
                                    <span
                                      style="
                                        font-family: Lato, sans-serif;
                                        font-size: 14px;
                                        line-height: 23.8px;
                                      "
                                    >
                                      <span
                                        style="
                                          font-size: 18px;
                                          line-height: 27.2px;
                                        "
                                        >Matthias</span
                                      ></span
                                    >
                                  </p>
                                  <p
                                    style="
                                      font-size: 14px;
                                      line-height: 170%;
                                      margin-bottom: 10px;
                                    "
                                  >
                                    <span
                                      style="
                                        font-family: Lato, sans-serif;
                                        font-size: 14px;
                                        line-height: 23.8px;
                                      "
                                      ><span
                                        style="
                                          font-size: 18px;
                                          line-height: 27.2px;
                                        "
                                      >
                                        <a
                                          class="text-decoration:inherit; color:inherit"
                                          href="https://www.lowisy.com/support"
                                          target="_blank"
                                        >
                                          Lowisy Support
                                        </a></span
                                      ></span
                                    >
                                  </p>
                                </div>
                                <div>
                                  <a
                                    href="https://www.lowisy.com/"
                                    title="logo"
                                    target="_blank"
                                  >
                                  <img width="200" height="100" src="https://lowisy-dev.s3.eu-central-1.amazonaws.com/Lowisy_Restaurants_big.png" title="logo">
                                  </a>

                                  <div>
                                    <a
                                      href="https://www.instagram.com/lowisy_dach/"
                                      target="_blank"
                                    >
                                      <i
                                        class="fa-brands fa-instagram fa-2x"
                                      ></i
                                    ></a>

                                    <a
                                      class="margin-left:10px"
                                      href="https://www.facebook.com/LowisyDACH/"
                                      target="_blank"
                                      ><i
                                        class="fa-brands fa-facebook fa-2x ml-10"
                                      ></i
                                    ></a>
                                  </div>
                                </div>

                                <div
                                  class="v-text-align"
                                  style="
                                    line-height: 170%;
                                    text-align: left;
                                    word-wrap: break-word;
                                  "
                                >
                                  <p style="font-size: 14px; line-height: 170%">
                                    &nbsp;
                                  </p>
                                  <p style="font-size: 14px; line-height: 170%">
                                    <span
                                      style="
                                        font-family: Lato, sans-serif;
                                        font-size: 18px;
                                        line-height: 27.2px;
                                      "
                                      >Lowisy eU&nbsp;</span
                                    >
                                  </p>
                                  <p style="font-size: 14px; line-height: 170%">
                                    <span
                                      style="
                                        font-family: Lato, sans-serif;
                                        font-size: 18px;
                                        line-height: 27.2px;
                                      "
                                      >Heiligenstädter Lände 29, A-1190 Wien&nbsp;</span
                                    >
                                  </p>

                                 
                                  <p style="font-size: 14px; line-height: 170%">
                                    <span
                                      style="
                                        font-family: Lato, sans-serif;
                                        font-size: 18px;
                                        line-height: 27.2px;
                                      "
                                      ><a href="mailto:info@lowisy.com"
                                        >E: info@lowisy.com</a
                                      >&nbsp;</span
                                    >
                                  </p>

                                  <p style="font-size: 14px; line-height: 170%">
                                    <span
                                      style="
                                        font-family: Lato, sans-serif;
                                        font-size: 18px;
                                        line-height: 27.2px;
                                      "
                                    >
                                      <a
                                        href="https://www.lowisy.com"
                                        target="_blank"
                                        >W: www.lowisy.com</a
                                      ></span
                                    >
                                  </p>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <!--[if (!mso)&(!IE)]><!-->
                      </div>
                      <!--<![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>

            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
          </td>
        </tr>
      </tbody>
    </table>
    <!--[if mso]></div><![endif]-->
    <!--[if IE]></div><![endif]-->
  </body>
</html>
`
}

export const getDeTemplateOrder = ({
  restaurantName,
  userName,
  orderNumber,
  paymentMethod,
  orderId,
  restaurantEmail,
  restaurantPhone,
  cartList,
  total,
  pickupTime,
}: any) => {
  let row = ''
  cartList.forEach(({ name, price, qty }: any) => {
    row += `<tr>
        <td class="tg-0pky">${name}</td>
        <td class="tg-0pky">${price} x ${qty}</td>
        <td class="tg-0pky">€ ${price * qty}</td>
      </tr>`
  })
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html
  xmlns="http://www.w3.org/1999/xhtml"
  xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:o="urn:schemas-microsoft-com:office:office"
>
  <head>
    <!--[if gte mso 9]>
      <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG />
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
    <![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="x-apple-disable-message-reformatting" />
    <!--[if !mso]><!-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <!--<![endif]-->
    <title></title>

    <style type="text/css">
        .tg  {border-collapse:collapse;border-spacing:0;}
.tg td{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
  overflow:hidden;padding:10px 5px;word-break:normal;}
.tg th{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
  font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;}
.tg .tg-0pky{border-color:inherit;text-align:left;vertical-align:top}
.tg .tg-0lax{text-align:left;vertical-align:top}
      a {
        color: inherit !important;
        text-decoration: none !important;
      }

      @media only screen and (min-width: 620px) {
        .u-row {
          width: 600px !important;
        }
        .u-row .u-col {
          vertical-align: top;
        }

        .u-row .u-col-100 {
          width: 600px !important;
        }
      }

      @media (max-width: 620px) {
        .u-row-container {
          max-width: 100% !important;
          padding-left: 0px !important;
          padding-right: 0px !important;
        }
        .u-row .u-col {
          min-width: 320px !important;
          max-width: 100% !important;
          display: block !important;
        }
        .u-row {
          width: 100% !important;
        }
        .u-col {
          width: 100% !important;
        }
        .u-col > div {
          margin: 0 auto;
        }
      }
      body {
        margin: 0;
        padding: 0;
      }

      table,
      tr,
      td {
        vertical-align: top;
        border-collapse: collapse;
      }

      p {
        margin: 0;
      }

      .ie-container table,
      .mso-container table {
        table-layout: fixed;
      }

      * {
        line-height: inherit;
      }

      table,
      td {
        color: #000000;
      }
      #u_body a {
        color: #0000ee;
        text-decoration: underline;
      }
      @media (max-width: 480px) {
        #u_content_image_4 .v-src-width {
          width: auto !important;
        }
        #u_content_image_4 .v-src-max-width {
          max-width: 43% !important;
        }
        #u_content_heading_1 .v-container-padding-padding {
          padding: 8px 20px 0px !important;
        }
        #u_content_heading_1 .v-font-size {
          font-size: 21px !important;
        }
        #u_content_heading_1 .v-text-align {
          text-align: center !important;
        }
        #u_content_text_2 .v-container-padding-padding {
          padding: 35px 15px 10px !important;
        }
        #u_content_text_3 .v-container-padding-padding {
          padding: 10px 15px 40px !important;
        }
      }
    </style>

    <!--[if !mso]><!-->
    <link
      href="https://fonts.googleapis.com/css?family=Lato:400,700&display=swap"
      rel="stylesheet"
      type="text/css"
    />
    <link
      href="https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap"
      rel="stylesheet"
      type="text/css"
    />
    <script
      src="https://kit.fontawesome.com/0b023c5569.js"
      crossorigin="anonymous"
    ></script>

    <!--<![endif]-->
  </head>

  <body
    class="clean-body u_body"
    style="
      margin: 0;
      padding: 0;
      -webkit-text-size-adjust: 100%;
      background-color: #c2e0f4;
      color: #000000;
    "
  >
    <!--[if IE]><div class="ie-container"><![endif]-->
    <!--[if mso]><div class="mso-container"><![endif]-->


                        <!--[if (!mso)&(!IE)]><!-->
                      </div>
                      <!--<![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>

            <div
              class="u-row-container"
              style="padding: 0px; background-color: transparent; margin-top:20px"
            >
              <div
                class="u-row"
                style="
                  margin: 0 auto;
                  min-width: 320px;
                  max-width: 600px;
                  overflow-wrap: break-word;
                  word-wrap: break-word;
                  word-break: break-word;
                  background-color: #ffffff;
                "
              >
                <div
                  style="
                    border-collapse: collapse;
                    display: table;
                    width: 100%;
                    height: 100%;
                    background-color: transparent;
                  "
                >
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->

                  <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                  <div
                    class="u-col u-col-100"
                    style="
                      max-width: 320px;
                      min-width: 600px;
                      display: table-cell;
                      vertical-align: top;
                    "
                  >
                    <div
                      style="
                        height: 100%;
                        width: 100% !important;
                        border-radius: 0px;
                        -webkit-border-radius: 0px;
                        -moz-border-radius: 0px;
                      "
                    >
                      <!--[if (!mso)&(!IE)]><!--><div
                        style="
                          height: 100%;
                          padding: 0px;
                          border-top: 0px solid transparent;
                          border-left: 0px solid transparent;
                          border-right: 0px solid transparent;
                          border-bottom: 0px solid transparent;
                          border-radius: 0px;
                          -webkit-border-radius: 0px;
                          -moz-border-radius: 0px;
                        "
                      ><!--<![endif]-->
                        <table
                          id="u_content_text_2"
                          style="font-family: arial, helvetica, sans-serif"
                          role="presentation"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                class="v-container-padding-padding"
                                style="
                                  overflow-wrap: break-word;
                                  word-break: break-word;
                                  padding: 35px 55px 10px;
                                  font-family: arial, helvetica, sans-serif;
                                "
                                align="left"
                              >
                                <div
                                  class="v-text-align"
                                  style="
                                    color: #333333;
                                    line-height: 180%;
                                    text-align: left;
                                    word-wrap: break-word;
                                  "
                                >
                                  <div class="v-text-align" align="center">
                                    <a
                                      href="https://www.lowisy.com/"
                                      title="logo"
                                      target="_blank"
                                    >
                                   <img width="250" height="100" src="https://lowisy-dev.s3.eu-central-1.amazonaws.com/Lowisy_Restaurants_big.png" title="logo">
                                    </a>
                                  </div>
                                  <p style="font-size: 14px; line-height: 180%">
                                    &nbsp;
                                  </p>


                                  <p style="font-size: 14px; line-height: 180%">
                                    <span
                                      style="
                                        font-size: 18px;
                                        line-height: 32.4px;
                                        font-family: Lato, sans-serif;
                                      "
                                      ><strong
                                        ><span
                                          style="
                                            line-height: 32.4px;
                                            font-size: 20px;
                                          "
                                          >Thank you for your order at ${restaurantName}!
                                        </span>
                                      </strong></span
                                    >
                                  </p>
                                  <p style="font-size: 14px; line-height: 180%">
                                    &nbsp;
                                  </p>
                                  <p style="font-size: 14px; line-height: 180%">
                                    <span
                                      style="
                                        font-size: 18px;
                                        line-height: 32.4px;
                                        font-family: Lato, sans-serif;
                                      "
                                      ><span
                                          style="
                                            line-height: 32.4px;
                                            font-size: 18px;
                                          "
                                          ><strong>Hello ${userName}</strong><br/>Thank you very much for your order.
                                        </span>
                                     </span
                                    >
                                  </p>
                                  <p style="font-size: 14px; line-height: 180%">
                                    &nbsp;
                                  </p>
                                  <p style="font-size: 14px; line-height: 180%">
                                    <span
                                      style="
                                        font-size: 18px;
                                        line-height: 32.4px;
                                        font-family: Lato, sans-serif;
                                      "
                                      ><span
                                          style="
                                            line-height: 32.4px;
                                            font-size: 18px;
                                          "
                                          >${restaurantName} received your order, the order number is:<strong>${orderNumber}</strong><br/>
                                          Time to pickup/delivery was <strong> ${pickupTime}.</strong>
                                        </span>
                                     </span
                                    >
                                  </p>
                                  <p style="font-size: 14px; line-height: 180%">
                                    &nbsp;
                                  </p>
                                  <p style="font-size: 14px; line-height: 180%;text-align:center">
                                    <span
                                      style="
                                        font-size: 18px;
                                        line-height: 32.4px;
                                        font-family: Lato, sans-serif;
                                      "
                                      ><span
                                          style="
                                            line-height: 32.4px;
                                            font-size: 18px;
                                          "
                                          ><strong>You can find details of your order here</strong>
                                        </span>
                                        <a style="display:block;" href="https://uat-restaurant.lowisy.com/orders/${orderId}">view order</a>
                                     </span
                                    >
                                  </p>
                                  <p style="font-size: 14px; line-height: 180%">
                                    &nbsp;
                                  </p>
                                </div>
                                <table class="tg" align="center">
                                    <thead>
                                      <tr>
                                        <td align="center" colspan="3">${restaurantName}</td>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      
                                      ${row}
                                     
                                      <tr>
                                        <td class="tg-0pky">Total</td>
                                        <td class="tg-0pky"></td>
                                        <td class="tg-0pky">€ ${total}</td>
                                      </tr>
                                      <tr>
                                        <td class="tg-0pky" colspan="2">Payment method</td>
                                        <td class="tg-0pky" >${paymentMethod}</td>
                                      </tr>
                                    </tbody>
                                    </table>
                                    <p style="font-size: 14px; line-height: 180%">
                                      &nbsp
                                    </p>
                                  <p style="font-size: 14px; line-height: 180%; text-align:center">
                                      <span
                                        style="
                                          font-family: Lato, sans-serif;
                                          font-size: 20px;
                                          line-height: 28.8px;
                                        "
                                        ></span
                                      >
                                    </p>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <table
                          id="u_content_text_3"
                          style="font-family: arial, helvetica, sans-serif"
                          role="presentation"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                class="v-container-padding-padding"
                                style="
                                  overflow-wrap: break-word;
                                  word-break: break-word;
                                  padding: 10px 55px 40px;
                                  font-family: arial, helvetica, sans-serif;
                                "
                                align="left"
                              >
                                <div
                                  class="v-text-align"
                                  style="
                                    line-height: 170%;
                                    text-align: left;
                                    word-wrap: break-word;
                                  "
                                >
     
                                  <p style="font-size: 14px; line-height: 170%">
                                    <span
                                      style="
                                        font-family: Lato, sans-serif;
                                        font-size: 18px;
                                        line-height: 27.2px;
                                      "
                                      >Answers to many questions in the
                                      support area at:
                                      <a
                                        href="https://www.lowisy.com/suppor"
                                        target="_blank"
                                        >https://www.lowisy.com/support</a
                                      >&nbsp;</span
                                    >
                                  </p>

                                 
                                  <p style="font-size: 14px; line-height: 170%">
                                    <span
                                      style="
                                        font-family: Lato, sans-serif;
                                        font-size: 18px;
                                        line-height: 27.2px;
                                      "
                                      >Regards,</span
                                    >
                                  </p>
                                  <p style="font-size: 14px; line-height: 170%">
                                    <span
                                      style="
                                        font-family: Lato, sans-serif;
                                        font-size: 14px;
                                        line-height: 23.8px;
                                      "
                                    >
                                      <span
                                        style="
                                          font-size: 18px;
                                          line-height: 27.2px;
                                        "
                                        >Matthias</span
                                      ></span
                                    >
                                  </p>
                                  <p
                                    style="
                                      font-size: 14px;
                                      line-height: 170%;
                                      margin-bottom: 10px;
                                    "
                                  >
                                    <span
                                      style="
                                        font-family: Lato, sans-serif;
                                        font-size: 14px;
                                        line-height: 23.8px;
                                      "
                                      ><span
                                        style="
                                          font-size: 18px;
                                          line-height: 27.2px;
                                        "
                                      >
                                        <a
                                          class="text-decoration:inherit; color:inherit"
                                          href="https://www.lowisy.com/support"
                                          target="_blank"
                                        >
                                          Lowisy Support
                                        </a></span
                                      ></span
                                    >
                                  </p>
                                </div>
                                <div>
                                  <a
                                    href="https://www.lowisy.com/"
                                    title="logo"
                                    target="_blank"
                                  >
                                  <img width="200" height="100" src="https://lowisy-dev.s3.eu-central-1.amazonaws.com/Lowisy_Restaurants_big.png" title="logo">
                                  </a>

                                  <div>
                                    <a
                                      href="https://www.instagram.com/lowisy_dach/"
                                      target="_blank"
                                    >
                                      <i
                                        class="fa-brands fa-instagram fa-2x"
                                      ></i
                                    ></a>

                                    <a
                                      class="margin-left:10px"
                                      href="https://www.facebook.com/LowisyDACH/"
                                      target="_blank"
                                      ><i
                                        class="fa-brands fa-facebook fa-2x ml-10"
                                      ></i
                                    ></a>
                                  </div>
                                </div>

                                <div
                                  class="v-text-align"
                                  style="
                                    line-height: 170%;
                                    text-align: left;
                                    word-wrap: break-word;
                                  "
                                >
                                  <p style="font-size: 14px; line-height: 170%">
                                    &nbsp;
                                  </p>
                                  <p style="font-size: 14px; line-height: 170%">
                                    <span
                                      style="
                                        font-family: Lato, sans-serif;
                                        font-size: 18px;
                                        line-height: 27.2px;
                                      "
                                      >Lowisy eU&nbsp;</span
                                    >
                                  </p>
                                  <p style="font-size: 14px; line-height: 170%">
                                    <span
                                      style="
                                        font-family: Lato, sans-serif;
                                        font-size: 18px;
                                        line-height: 27.2px;
                                      "
                                      >Heiligenstädter Lände 29, A-1190 Wien&nbsp;</span
                                    >
                                  </p>

                                 
                                  <p style="font-size: 14px; line-height: 170%">
                                    <span
                                      style="
                                        font-family: Lato, sans-serif;
                                        font-size: 18px;
                                        line-height: 27.2px;
                                      "
                                      ><a href="mailto:info@lowisy.com"
                                        >E: info@lowisy.com</a
                                      >&nbsp;</span
                                    >
                                  </p>

                                  <p style="font-size: 14px; line-height: 170%">
                                    <span
                                      style="
                                        font-family: Lato, sans-serif;
                                        font-size: 18px;
                                        line-height: 27.2px;
                                      "
                                    >
                                      <a
                                        href="https://www.lowisy.com"
                                        target="_blank"
                                        >W: www.lowisy.com</a
                                      ></span
                                    >
                                  </p>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <!--[if (!mso)&(!IE)]><!-->
                      </div>
                      <!--<![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>

            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
          </td>
        </tr>
      </tbody>
    </table>
    <!--[if mso]></div><![endif]-->
    <!--[if IE]></div><![endif]-->
  </body>
</html>
`
}

export const getEngTemplateOrderCancelled = ({
  restaurantName,
  userName,
  orderNumber,
  paymentMethod,
  orderId,
  restaurantEmail,
  restaurantPhone,
  cartList,
  total,
  pickupTime,
}: any) => {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html
  xmlns="http://www.w3.org/1999/xhtml"
  xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:o="urn:schemas-microsoft-com:office:office"
>
  <head>
    <!--[if gte mso 9]>
      <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG />
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
    <![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="x-apple-disable-message-reformatting" />
    <!--[if !mso]><!-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <!--<![endif]-->
    <title></title>

    <style type="text/css">
      a {
        color: inherit !important;
        text-decoration: none !important;
      }

      @media only screen and (min-width: 620px) {
        .u-row {
          width: 600px !important;
        }
        .u-row .u-col {
          vertical-align: top;
        }

        .u-row .u-col-100 {
          width: 600px !important;
        }
      }

      @media (max-width: 620px) {
        .u-row-container {
          max-width: 100% !important;
          padding-left: 0px !important;
          padding-right: 0px !important;
        }
        .u-row .u-col {
          min-width: 320px !important;
          max-width: 100% !important;
          display: block !important;
        }
        .u-row {
          width: 100% !important;
        }
        .u-col {
          width: 100% !important;
        }
        .u-col > div {
          margin: 0 auto;
        }
      }
      body {
        margin: 0;
        padding: 0;
      }

      table,
      tr,
      td {
        vertical-align: top;
        border-collapse: collapse;
      }

      p {
        margin: 0;
      }

      .ie-container table,
      .mso-container table {
        table-layout: fixed;
      }

      * {
        line-height: inherit;
      }

      table,
      td {
        color: #000000;
      }
      #u_body a {
        color: #0000ee;
        text-decoration: underline;
      }
      @media (max-width: 480px) {
        #u_content_image_4 .v-src-width {
          width: auto !important;
        }
        #u_content_image_4 .v-src-max-width {
          max-width: 43% !important;
        }
        #u_content_heading_1 .v-container-padding-padding {
          padding: 8px 20px 0px !important;
        }
        #u_content_heading_1 .v-font-size {
          font-size: 21px !important;
        }
        #u_content_heading_1 .v-text-align {
          text-align: center !important;
        }
        #u_content_text_2 .v-container-padding-padding {
          padding: 35px 15px 10px !important;
        }
        #u_content_text_3 .v-container-padding-padding {
          padding: 10px 15px 40px !important;
        }
      }
    </style>

    <!--[if !mso]><!-->
    <link
      href="https://fonts.googleapis.com/css?family=Lato:400,700&display=swap"
      rel="stylesheet"
      type="text/css"
    />
    <link
      href="https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap"
      rel="stylesheet"
      type="text/css"
    />
    <script
      src="https://kit.fontawesome.com/0b023c5569.js"
      crossorigin="anonymous"
    ></script>

    <!--<![endif]-->
  </head>

  <body
    class="clean-body u_body"
    style="
      margin: 0;
      padding: 0;
      -webkit-text-size-adjust: 100%;
      background-color: #c2e0f4;
      color: #000000;
    "
  >

            <div
              class="u-row-container"
              style="padding: 0px; background-color: transparent"
            >
              <div
                class="u-row"
                style="
                  margin: 0 auto;
                  min-width: 320px;
                  max-width: 600px;
                  overflow-wrap: break-word;
                  word-wrap: break-word;
                  word-break: break-word;
                  background-color: #ffffff;
                "
              >
                <div
                  style="
                    border-collapse: collapse;
                    display: table;
                    width: 100%;
                    height: 100%;
                    background-color: transparent;
                  "
                >
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->

                  <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                  <div
                    class="u-col u-col-100"
                    style="
                      max-width: 320px;
                      min-width: 600px;
                      display: table-cell;
                      vertical-align: top;
                    "
                  >
                    <div
                      style="
                        height: 100%;
                        width: 100% !important;
                        border-radius: 0px;
                        -webkit-border-radius: 0px;
                        -moz-border-radius: 0px;
                      "
                    >
                      <!--[if (!mso)&(!IE)]><!--><div
                        style="
                          height: 100%;
                          padding: 0px;
                          border-top: 0px solid transparent;
                          border-left: 0px solid transparent;
                          border-right: 0px solid transparent;
                          border-bottom: 0px solid transparent;
                          border-radius: 0px;
                          -webkit-border-radius: 0px;
                          -moz-border-radius: 0px;
                        "
                      ><!--<![endif]-->
                        <table
                          id="u_content_text_2"
                          style="font-family: arial, helvetica, sans-serif"
                          role="presentation"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                class="v-container-padding-padding"
                                style="
                                  overflow-wrap: break-word;
                                  word-break: break-word;
                                  padding: 35px 55px 10px;
                                  font-family: arial, helvetica, sans-serif;
                                "
                                align="left"
                              >
                                <div
                                  class="v-text-align"
                                  style="
                                    color: #333333;
                                    line-height: 180%;
                                    text-align: left;
                                    word-wrap: break-word;
                                  "
                                >
                                  <div class="v-text-align" align="center">
                                    <a
                                      href="https://uat.lowisy.com/"
                                      title="logo"
                                      target="_blank"
                                    >
                                  <img width="250" height="100" src="https://lowisy-dev.s3.eu-central-1.amazonaws.com/Lowisy_Restaurants_big.png" title="logo">
                                    </a>
                                  </div>
                                
                                  <p style="font-size: 14px; line-height: 180%">
                                    &nbsp;
                                  </p>

                                  <p style="font-size: 14px; line-height: 180%">
                                    <span
                                      style="
                                        font-size: 18px;
                                        line-height: 32.4px;
                                        font-family: Lato, sans-serif;
                                      "
                                      ><strong
                                        ><span
                                          style="
                                            line-height: 32.4px;
                                            font-size: 20px;
                                          "
                                          >${restaurantName} has not confirmed your order.
                                        </span>
                                      </strong></span
                                    >
                                  </p>
                                  <p style="font-size: 14px; line-height: 180%">
                                    &nbsp;
                                  </p>
                                  <p style="font-size: 14px; line-height: 180%">
                                    <span   style="
                                    font-family: Lato, sans-serif;
                                    font-size: 18px;
                                    line-height: 28.8px;
                                  "><strong>Hello ${userName}</strong></span> <br/>
                                    <span
                                      style="
                                        font-family: Lato, sans-serif;
                                        font-size: 18px;
                                        line-height: 28.8px;
                                      "
                                      >We are sorry, ${restaurantName} did not confirm your order within 15 minutes! Therefore, we had to cancel your order.
                                      </span
                                    >
                                  </p>
                               


                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <table
                          id="u_content_text_3"
                          style="font-family: arial, helvetica, sans-serif"
                          role="presentation"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                class="v-container-padding-padding"
                                style="
                                  overflow-wrap: break-word;
                                  word-break: break-word;
                                  padding: 10px 55px 40px;
                                  font-family: arial, helvetica, sans-serif;
                                "
                                align="left"
                              >
                                <div
                                  class="v-text-align"
                                  style="
                                    line-height: 170%;
                                    text-align: left;
                                    word-wrap: break-word;
                                  "
                                >
                                <p style="font-size: 14px; line-height: 170%">
                                    <span
                                      style="
                                        font-family: Lato, sans-serif;
                                        font-size: 18px;
                                        line-height: 27.2px;
                                      "
                                      >You can find more restaurants at 
                                      support area at:
                                      <a
                                        href="https://www.lowisy.com"
                                        target="_blank"
                                        >https://www.lowisy.com</a
                                      ></span
                                    >
                                  </p>
       

                                  <p style="font-size: 14px; line-height: 170%">
                                    <span
                                      style="
                                        font-family: Lato, sans-serif;
                                        font-size: 18px;
                                        line-height: 27.2px;
                                      "
                                      >Answers to many questions can be found in the
                                      support area at:
                                      <a
                                        href="https://uat.lowisy.com/suppor"
                                        target="_blank"
                                        >https://uat.lowisy.com/support</a
                                      ></span
                                    >
                                  </p>

                                  <p style="font-size: 14px; line-height: 170%">
                                    &nbsp;
                                  </p>
                                  <p style="font-size: 14px; line-height: 170%">
                                    <span
                                      style="
                                        font-family: Lato, sans-serif;
                                        font-size: 18px;
                                        line-height: 27.2px;
                                      "
                                      >Greetings,</span
                                    >
                                  </p>
                                  <p style="font-size: 14px; line-height: 170%">
                                    <span
                                      style="
                                        font-family: Lato, sans-serif;
                                        font-size: 14px;
                                        line-height: 23.8px;
                                      "
                                    >
                                      <span
                                        style="
                                          font-size: 18px;
                                          line-height: 27.2px;
                                        "
                                        >Matthias</span
                                      ></span
                                    >
                                  </p>
                                  <p
                                    style="
                                      font-size: 14px;
                                      line-height: 170%;
                                      margin-bottom: 10px;
                                    "
                                  >
                                    <span
                                      style="
                                        font-family: Lato, sans-serif;
                                        font-size: 14px;
                                        line-height: 23.8px;
                                      "
                                      ><span
                                        style="
                                          font-size: 18px;
                                          line-height: 27.2px;
                                        "
                                      >
                                        <a
                                          class="text-decoration:inherit; color:inherit"
                                          href="https://uat.lowisy.com/support"
                                          target="_blank"
                                        >
                                          Lowisy Support
                                        </a></span
                                      ></span
                                    >
                                  </p>
                                </div>
                                <div>
                                  <a
                                    href="https://uat.lowisy.com/"
                                    title="logo"
                                    target="_blank"
                                  >
                                 <img width="250" height="100" src="https://lowisy-dev.s3.eu-central-1.amazonaws.com/Lowisy_Restaurants_big.png" title="logo">
                                  </a>

                                  <div>
                                    <a
                                      href="https://www.instagram.com/lowisy_dach/"
                                      target="_blank"
                                    >
                                      <i
                                        class="fa-brands fa-instagram fa-2x"
                                      ></i
                                    ></a>

                                    <a
                                      class="margin-left:10px"
                                      href="https://www.facebook.com/LowisyDACH/"
                                      target="_blank"
                                      ><i
                                        class="fa-brands fa-facebook fa-2x ml-10"
                                      ></i
                                    ></a>
                                  </div>
                                </div>

                                <div
                                  class="v-text-align"
                                  style="
                                    line-height: 170%;
                                    text-align: left;
                                    word-wrap: break-word;
                                  "
                                >
                                  <p style="font-size: 14px; line-height: 170%">
                                    &nbsp;
                                  </p>
                                  <p style="font-size: 14px; line-height: 170%">
                                    <span
                                      style="
                                        font-family: Lato, sans-serif;
                                        font-size: 18px;
                                        line-height: 27.2px;
                                      "
                                      >Lowisy eU&nbsp;</span
                                    >
                                  </p>
                                  <p style="font-size: 14px; line-height: 170%">
                                    <span
                                      style="
                                        font-family: Lato, sans-serif;
                                        font-size: 18px;
                                        line-height: 27.2px;
                                      "
                                      >Heiligenstädter Lände 29, A-1190 Wien&nbsp;</span
                                    >
                                  </p>

                                 
                                  <p style="font-size: 14px; line-height: 170%">
                                    <span
                                      style="
                                        font-family: Lato, sans-serif;
                                        font-size: 18px;
                                        line-height: 27.2px;
                                      "
                                      ><a href="mailto:info@lowisy.com"
                                        >E: info@lowisy.com</a
                                      >&nbsp;</span
                                    >
                                  </p>

                                  <p style="font-size: 14px; line-height: 170%">
                                    <span
                                      style="
                                        font-family: Lato, sans-serif;
                                        font-size: 18px;
                                        line-height: 27.2px;
                                      "
                                    >
                                      <a
                                        href="https://uat.lowisy.com"
                                        target="_blank"
                                        >W: uat.lowisy.com</a
                                      ></span
                                    >
                                  </p>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <!--[if (!mso)&(!IE)]><!-->
                      </div>
                      <!--<![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>

            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
          </td>
        </tr>
      </tbody>
    </table>
    <!--[if mso]></div><![endif]-->
    <!--[if IE]></div><![endif]-->
  </body>
</html>
`
}

export const getDeTemplateOrderCancelled = ({
  restaurantName,
  userName,
  orderNumber,
  paymentMethod,
  orderId,
  restaurantEmail,
  restaurantPhone,
  cartList,
  total,
  pickupTime,
}: any) => {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html
  xmlns="http://www.w3.org/1999/xhtml"
  xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:o="urn:schemas-microsoft-com:office:office"
>
  <head>
    <!--[if gte mso 9]>
      <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG />
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
    <![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="x-apple-disable-message-reformatting" />
    <!--[if !mso]><!-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <!--<![endif]-->
    <title></title>

    <style type="text/css">
      a {
        color: inherit !important;
        text-decoration: none !important;
      }

      @media only screen and (min-width: 620px) {
        .u-row {
          width: 600px !important;
        }
        .u-row .u-col {
          vertical-align: top;
        }

        .u-row .u-col-100 {
          width: 600px !important;
        }
      }

      @media (max-width: 620px) {
        .u-row-container {
          max-width: 100% !important;
          padding-left: 0px !important;
          padding-right: 0px !important;
        }
        .u-row .u-col {
          min-width: 320px !important;
          max-width: 100% !important;
          display: block !important;
        }
        .u-row {
          width: 100% !important;
        }
        .u-col {
          width: 100% !important;
        }
        .u-col > div {
          margin: 0 auto;
        }
      }
      body {
        margin: 0;
        padding: 0;
      }

      table,
      tr,
      td {
        vertical-align: top;
        border-collapse: collapse;
      }

      p {
        margin: 0;
      }

      .ie-container table,
      .mso-container table {
        table-layout: fixed;
      }

      * {
        line-height: inherit;
      }

      table,
      td {
        color: #000000;
      }
      #u_body a {
        color: #0000ee;
        text-decoration: underline;
      }
      @media (max-width: 480px) {
        #u_content_image_4 .v-src-width {
          width: auto !important;
        }
        #u_content_image_4 .v-src-max-width {
          max-width: 43% !important;
        }
        #u_content_heading_1 .v-container-padding-padding {
          padding: 8px 20px 0px !important;
        }
        #u_content_heading_1 .v-font-size {
          font-size: 21px !important;
        }
        #u_content_heading_1 .v-text-align {
          text-align: center !important;
        }
        #u_content_text_2 .v-container-padding-padding {
          padding: 35px 15px 10px !important;
        }
        #u_content_text_3 .v-container-padding-padding {
          padding: 10px 15px 40px !important;
        }
      }
    </style>

    <!--[if !mso]><!-->
    <link
      href="https://fonts.googleapis.com/css?family=Lato:400,700&display=swap"
      rel="stylesheet"
      type="text/css"
    />
    <link
      href="https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap"
      rel="stylesheet"
      type="text/css"
    />
    <script
      src="https://kit.fontawesome.com/0b023c5569.js"
      crossorigin="anonymous"
    ></script>

    <!--<![endif]-->
  </head>

  <body
    class="clean-body u_body"
    style="
      margin: 0;
      padding: 0;
      -webkit-text-size-adjust: 100%;
      background-color: #c2e0f4;
      color: #000000;
    "
  >

            <div
              class="u-row-container"
              style="padding: 0px; background-color: transparent"
            >
              <div
                class="u-row"
                style="
                  margin: 0 auto;
                  min-width: 320px;
                  max-width: 600px;
                  overflow-wrap: break-word;
                  word-wrap: break-word;
                  word-break: break-word;
                  background-color: #ffffff;
                "
              >
                <div
                  style="
                    border-collapse: collapse;
                    display: table;
                    width: 100%;
                    height: 100%;
                    background-color: transparent;
                  "
                >
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->

                  <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                  <div
                    class="u-col u-col-100"
                    style="
                      max-width: 320px;
                      min-width: 600px;
                      display: table-cell;
                      vertical-align: top;
                    "
                  >
                    <div
                      style="
                        height: 100%;
                        width: 100% !important;
                        border-radius: 0px;
                        -webkit-border-radius: 0px;
                        -moz-border-radius: 0px;
                      "
                    >
                      <!--[if (!mso)&(!IE)]><!--><div
                        style="
                          height: 100%;
                          padding: 0px;
                          border-top: 0px solid transparent;
                          border-left: 0px solid transparent;
                          border-right: 0px solid transparent;
                          border-bottom: 0px solid transparent;
                          border-radius: 0px;
                          -webkit-border-radius: 0px;
                          -moz-border-radius: 0px;
                        "
                      ><!--<![endif]-->
                        <table
                          id="u_content_text_2"
                          style="font-family: arial, helvetica, sans-serif"
                          role="presentation"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                class="v-container-padding-padding"
                                style="
                                  overflow-wrap: break-word;
                                  word-break: break-word;
                                  padding: 35px 55px 10px;
                                  font-family: arial, helvetica, sans-serif;
                                "
                                align="left"
                              >
                                <div
                                  class="v-text-align"
                                  style="
                                    color: #333333;
                                    line-height: 180%;
                                    text-align: left;
                                    word-wrap: break-word;
                                  "
                                >
                                  <div class="v-text-align" align="center">
                                    <a
                                      href="https://uat.lowisy.com/"
                                      title="logo"
                                      target="_blank"
                                    >
                                  <img width="250" height="100" src="https://lowisy-dev.s3.eu-central-1.amazonaws.com/Lowisy_Restaurants_big.png" title="logo">
                                    </a>
                                  </div>
                                  <p style="font-size: 14px; line-height: 180%">
                                    &nbsp;
                                  </p>

                                  <p style="font-size: 14px; line-height: 180%">
                                    <span
                                      style="
                                        font-size: 18px;
                                        line-height: 32.4px;
                                        font-family: Lato, sans-serif;
                                      "
                                      ><strong
                                        ><span
                                          style="
                                            line-height: 32.4px;
                                            font-size: 20px;
                                          "
                                          >${restaurantName} hat deine Bestellung nicht bestätigt!
                                        </span>
                                      </strong></span
                                    >
                                  </p>
                                  <p style="font-size: 14px; line-height: 180%">
                                    &nbsp;
                                  </p>
                                  <p style="font-size: 14px; line-height: 180%">
                                    <span   style="
                                    font-family: Lato, sans-serif;
                                    font-size: 18px;
                                    line-height: 28.8px;
                                  "><strong>Hallo ${userName}</strong></span> <br/>
                                    <span
                                      style="
                                        font-family: Lato, sans-serif;
                                        font-size: 18px;
                                        line-height: 28.8px;
                                      "
                                      >Es tut uns leid, ${restaurantName} hat deine Bestellung innerhalb von 15 Minuten nicht bestätigt! Daher mussten wir deine Bestellung stornieren.
                                      </span
                                    >
                                  </p>
                               


                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <table
                          id="u_content_text_3"
                          style="font-family: arial, helvetica, sans-serif"
                          role="presentation"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                class="v-container-padding-padding"
                                style="
                                  overflow-wrap: break-word;
                                  word-break: break-word;
                                  padding: 10px 55px 40px;
                                  font-family: arial, helvetica, sans-serif;
                                "
                                align="left"
                              >
                                <div
                                  class="v-text-align"
                                  style="
                                    line-height: 170%;
                                    text-align: left;
                                    word-wrap: break-word;
                                  "
                                >
                                <p style="font-size: 14px; line-height: 170%">
                                    <span
                                      style="
                                        font-family: Lato, sans-serif;
                                        font-size: 18px;
                                        line-height: 27.2px;
                                      "
                                      >Weitere Restaurants findest du auf
                                      <a
                                        href="https://www.lowisy.com"
                                        target="_blank"
                                        >https://www.lowisy.com</a
                                      ></span
                                    >
                                  </p>
       

                                  <p style="font-size: 14px; line-height: 170%">
                                    <span
                                      style="
                                        font-family: Lato, sans-serif;
                                        font-size: 18px;
                                        line-height: 27.2px;
                                      "
                                      >Antworten auf viele Fragen findest du im Supportbereich unter:
                                      <a
                                        href="https://uat.lowisy.com/suppor"
                                        target="_blank"
                                        >https://uat.lowisy.com/support</a
                                      ></span
                                    >
                                  </p>

                                  <p style="font-size: 14px; line-height: 170%">
                                    &nbsp;
                                  </p>
                                  <p style="font-size: 14px; line-height: 170%">
                                    <span
                                      style="
                                        font-family: Lato, sans-serif;
                                        font-size: 18px;
                                        line-height: 27.2px;
                                      "
                                      >Greetings,</span
                                    >
                                  </p>
                                  <p style="font-size: 14px; line-height: 170%">
                                    <span
                                      style="
                                        font-family: Lato, sans-serif;
                                        font-size: 14px;
                                        line-height: 23.8px;
                                      "
                                    >
                                      <span
                                        style="
                                          font-size: 18px;
                                          line-height: 27.2px;
                                        "
                                        >Matthias</span
                                      ></span
                                    >
                                  </p>
                                  <p
                                    style="
                                      font-size: 14px;
                                      line-height: 170%;
                                      margin-bottom: 10px;
                                    "
                                  >
                                    <span
                                      style="
                                        font-family: Lato, sans-serif;
                                        font-size: 14px;
                                        line-height: 23.8px;
                                      "
                                      ><span
                                        style="
                                          font-size: 18px;
                                          line-height: 27.2px;
                                        "
                                      >
                                        <a
                                          class="text-decoration:inherit; color:inherit"
                                          href="https://uat.lowisy.com/support"
                                          target="_blank"
                                        >
                                          Lowisy Support
                                        </a></span
                                      ></span
                                    >
                                  </p>
                                </div>
                                <div>
                                  <a
                                    href="https://uat.lowisy.com/"
                                    title="logo"
                                    target="_blank"
                                  >
                                 <img width="250" height="100" src="https://lowisy-dev.s3.eu-central-1.amazonaws.com/Lowisy_Restaurants_big.png" title="logo">
                                  </a>

                                  <div>
                                    <a
                                      href="https://www.instagram.com/lowisy_dach/"
                                      target="_blank"
                                    >
                                      <i
                                        class="fa-brands fa-instagram fa-2x"
                                      ></i
                                    ></a>

                                    <a
                                      class="margin-left:10px"
                                      href="https://www.facebook.com/LowisyDACH/"
                                      target="_blank"
                                      ><i
                                        class="fa-brands fa-facebook fa-2x ml-10"
                                      ></i
                                    ></a>
                                  </div>
                                </div>

                                <div
                                  class="v-text-align"
                                  style="
                                    line-height: 170%;
                                    text-align: left;
                                    word-wrap: break-word;
                                  "
                                >
                                  <p style="font-size: 14px; line-height: 170%">
                                    &nbsp;
                                  </p>
                                  <p style="font-size: 14px; line-height: 170%">
                                    <span
                                      style="
                                        font-family: Lato, sans-serif;
                                        font-size: 18px;
                                        line-height: 27.2px;
                                      "
                                      >Lowisy eU&nbsp;</span
                                    >
                                  </p>
                                  <p style="font-size: 14px; line-height: 170%">
                                    <span
                                      style="
                                        font-family: Lato, sans-serif;
                                        font-size: 18px;
                                        line-height: 27.2px;
                                      "
                                      >Heiligenstädter Lände 29, A-1190 Wien&nbsp;</span
                                    >
                                  </p>

                                 
                                  <p style="font-size: 14px; line-height: 170%">
                                    <span
                                      style="
                                        font-family: Lato, sans-serif;
                                        font-size: 18px;
                                        line-height: 27.2px;
                                      "
                                      ><a href="mailto:info@lowisy.com"
                                        >E: info@lowisy.com</a
                                      >&nbsp;</span
                                    >
                                  </p>

                                  <p style="font-size: 14px; line-height: 170%">
                                    <span
                                      style="
                                        font-family: Lato, sans-serif;
                                        font-size: 18px;
                                        line-height: 27.2px;
                                      "
                                    >
                                      <a
                                        href="https://uat.lowisy.com"
                                        target="_blank"
                                        >W: uat.lowisy.com</a
                                      ></span
                                    >
                                  </p>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <!--[if (!mso)&(!IE)]><!-->
                      </div>
                      <!--<![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>

            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
          </td>
        </tr>
      </tbody>
    </table>
    <!--[if mso]></div><![endif]-->
    <!--[if IE]></div><![endif]-->
  </body>
</html>
`
}
