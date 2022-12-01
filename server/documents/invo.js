import moment from 'moment'

export default function (
   { name,
      address,
      phone,
      email,
      dueDate,
      date,
      id,
      notes,
      subTotal,
      type,
      vat,
      total,
      items,
      status,
      totalAmountReceived,
      balanceDue,
      company,
   }) {
    const today = new Date();
return `
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title>A simple, clean, and responsive HTML invoice template</title>

		<style>
			.invoice-box {
				max-width: 800px;
				margin: auto;
				padding: 30px;
				border: 1px solid #eee;
				box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
				font-size: 16px;
				line-height: 24px;
				font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
				color: #555;
			}

			.invoice-box table {
				width: 100%;
				line-height: inherit;
				text-align: left;
			}

			.invoice-box table td {
				padding: 5px;
				vertical-align: top;

			}

			.invoice-box table tr td:nth-child(2) {
				text-align: right;
			}

			.invoice-box table tr.top table td {
				padding-bottom: 20px;
			}

			.invoice-box table tr.top table td.title {
				font-size: 45px;
				line-height: 45px;
				color: #333;
			}

			.invoice-box table tr.information table td {
				padding-bottom: 40px;
			}

			.invoice-box table tr.heading td {
				background: #eee;
				border-bottom: 1px solid #ddd;
				font-weight: bold;
			}

			.invoice-box table tr.details td {
				padding-bottom: 20px;
			}

			.invoice-box table tr.item td {
				border-bottom: 1px solid #eee;
			}

			.invoice-box table tr.item.last td {
				border-bottom: none;
			}

			.invoice-box table tr.total td:nth-child(4) {
				border-top: 2px solid #eee;
				font-weight: bold;
			}

			@media only screen and (max-width: 600px) {
				.invoice-box table tr.top table td {
					width: 100%;
					display: block;
					text-align: center;
				}

				.invoice-box table tr.information table td {
					width: 100%;
					display: block;
					text-align: center;
				}
			}

			/** RTL **/
			.invoice-box.rtl {
				direction: rtl;
				font-family: Tahoma, 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
			}

			.invoice-box.rtl table {
				text-align: right;
			}

			.invoice-box.rtl table tr td:nth-child(2) {
				text-align: left;
			}
		</style>
	</head>

	<body>
		<div class="invoice-box">
			<table cellpadding="0" cellspacing="0">
				<tr class="top">
					<td colspan="4">
						<table>
							<tr>
								<td class="title">
									<img src=${company.logo} style="width: 100%; max-width: 60px"/>
								</td>

								<td>
									Invoice #: ${id}<br />
									Created: ${moment(date).format('ll')}<br />
									Due: ${moment(dueDate).format('ll')}
								</td>
							</tr>
						</table>
					</td>
				</tr>

				<tr class="information">
					<td colspan="4">
						<table>
							<tr>
								<td>
									Sparksuite, Inc.<br />
									12345 Sunny Road<br />
									Sunnyville, CA 12345
								</td>

								<td>
                                    ${name}<br />
									John Doe<br />
									${email}
								</td>
							</tr>
						</table>
					</td>
				</tr>


                <tr class="heading">
                    <td>Item</td>
                    <td style="text-align: left">Qty</td>
                    <td style="text-align: left">Unit Price</td>
                    <td style="text-align: right">Total</td>
                </tr>

                ${items.map((item) => (
                `<tr>
                    <td>${item.itemName}</td>
                    <td style="text-align: left">${item.quantity}</td>
                    <td style="text-align: left">Rp ${item.unitPrice}</td>
                    <td style="text-align: right">Rp ${(item.quantity * item.unitPrice) - (item.quantity * item.unitPrice) * item.discount / 100}</td>
                </tr>`
                ))
                }
                <tr class="total">
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style="text-align: right">Total: Rp ${subTotal}</td>
                </tr>

				<tr class="heading">
					<td>Invoice Summary</td>
					<td></td>
				</tr>

				<tr class="item">
					<td>Subtotal</td>
					<td>Rp ${subTotal}</td>
				</tr>

				<tr class="item">
					<td>Vat</td>
					<td>Rp ${vat}</td>
				</tr>
                <tr class="item">
                    <td>Total</td>
                    <td>Rp ${total}</td>
                </tr>
                <tr class="item">
                    <td>Total Amount Received</td>
                    <td>Rp ${totalAmountReceived}</td>
                </tr>

				<tr class="item last">
					<td>Balance Due</td>
					<td>Rp ${balanceDue}</td>
				</tr>

				<tr class="information">
				<td colspan="4">
					<table>
						<tr>
							<td>
								Notes
								<br />
								${notes}
							</td>
						</tr>
					</table>
				</td>
			</tr>
			</table>
		</div>
	</body>
</html>
`
;
};