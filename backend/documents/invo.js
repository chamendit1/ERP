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
	  totalText,
	  totalFormat,
    //   company,
   }) {
    const today = new Date();
return `
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<style>
			.invoice-box {
				max-width: 2400px;
				max-height: 800px;
				margin: auto;
				padding: 15px;
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
				padding-bottom: 10px;
			}

			.invoice-box table tr.top table td.title {
				font-size: 20px;
				font-weight: bold;
			}

			.invoice-box table tr.information table td {
				padding-bottom: 40px;
			}

			.invoice-box table tr.heading td {
				border-top: 1px solid #ddd;
				border-bottom: 1px solid #ddd;
				font-weight: bold;
			}
			.invoice-box table tr.data td {
				border-bottom: 1px solid #ddd;
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

			.invoice-box table tr.total td:nth-child(3) {
				border-top: 2px solid #eee;
			}

			.invoice-box table tr.total td:nth-child(4) {
				font-weight: bold;
				border-top: 2px solid #eee;
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
					border: 1px solid #eee;
				}
				.invoice-box table tr.information td table tr td.notes {
					width: 50%;
					// display: block;
					// text-align: center;
					// border: 1px solid #eee;
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
								<td class="title" width="60%">
										Indo Plastik Jaya </br> </br>
										Surat Jalan No: ${id}
								</td>

								<td style="text-align:left;">
										Jakarta, ${moment(date).format('MMMM Do YYYY')} </br>
										Kepada Yth: </br>
										${name}
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
                `<tr class="data">
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
					<td>Subtotal</td>
					<td style="text-align: right">Rp ${subTotal}</td>
				</tr>

				<tr class="total">
					<td></td>
                    <td></td>
					<td>Vat</td>
					<td style="text-align: right">Rp ${vat}</td>
				</tr>
                <tr class="total">
					<td></td>
                    <td></td>
                    <td>Total</td>
                    <td style="text-align: right">Rp ${totalFormat}</td>
                </tr>
				<tr class="information">
					<td colspan="2">
						Notes
						<br />
						
						${totalText} Rupiah </br>
						${notes}
					</td>
					<td colspan="2">
						Hormat Kami,
					</td>
				</tr>
			</table>
		</div>
	</body>
</html>
`
;
};