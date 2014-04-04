
// USO:
// MailerGmail.Params.AddressEmail = "wqweq"
// MailerGmail.Params.AddressName = "adasdas"
// MailerGmail.Send(fnOk);
var	MailerGmail = {
		MeMailer: new MailerClass("smtp.gmail.com"),		
		Params: {
			Username: "danielmgv2@gmail.com",
			Password: "976219766",
			AddressEmail: "danielmgv@gmail.com",
			AddressName: "Daniel M",
			Language: "es",
			Subject: "",
			Body: ""
		},
		Send : function(SendEmailDone){this.MeMailer.Send(Params, SendEmailDone);},		
};

function MailerClass(Host)
{	
	var MailerPath = '../Ajax/include/Mailer/mailer.php';
	
	this.Send = function (Params, SendEmailDone)
	{	
        var jqxhr = $.post(MailerPath, Params).done(SendEmailDone).fail(this.SendEmailFail);
	};			
	
	this.SendEmailFail = function (XMLHttpRequest, textStatus, errorThrown) {
		//$.mobile.loading( 'hide' );
		if(httpRequest.status = 500)
		{
			try{
				var errorJson = $.parseJSON(httpRequest.responseText);//eval(httpRequest.responseText);
				showError(errorJson.Error);
			}
			catch(any){
				showError(httpRequest.responseText);		
			}
		}
		else
		{	
			showError(textStatus + errorThrown.message);	
		}
	};
}
