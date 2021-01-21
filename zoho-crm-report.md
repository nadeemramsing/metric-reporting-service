# Acknowledgement
Having never worked with Zoho CRM and the likes of it before, I acknowledge that it has been a nice experience to work with Zoho CRM. I now see it as a very powerful CRM tool. While there was a learning curve, it was relatively easy to use and its documentation and forum has been of great help.

# Requirements
Here is the requirements design I made before planning:
- System should have different types of contact: Residential, Commercial, Farm

- System should have different levels of interest: Cold, Warm, Hot

- TODO: 
    - Automatically send a sequence of tailored emails to each type of contact
    - Frequency:
        - Cold: 4 weeks
        - Warm: 2 weeks
        - Hot: 1 week
    - Sequence:
        - Residential: 10 emails
        - Commercial: 8 emails
        - Farm: 7 emails
    - Each email should be sent once
    - Each email should be sent in the specific ordered sequence (Residential -> Commercial -> Farm)
    - Email sequence needs to begin on the Wednesday of the week after the contact has been added
    - Once emails in sequence run out, no further emails to be sent (stopping condition)
    - CRM User should be able to change the level of interest of any contact at any point
    - CRM User should always know where a contact is in the email sequence
    - When a contact click a link in the email, upgrade his interest level

# Planning
Here is the planning I made before implementation:
- Structure layout:
    - Contact Basic Information (inc. firstname: Single Line, lastname: Single Line, email: Email)
    - Contact Type: Pick List field
    - Contact Interest Level: Pick List field
    - Contact Email Sequence: Single Line

- For email automation, use Schedules
- For on call, upgrade contact's interest level, use Flow > Incoming Webhook Trigger

# Fields
Here are the basic steps I followed to create some fields:
- Click on *Create & Edit Fields*
![](zoho-crm-report-resources/0.5.png)
- Add *Type* and *Interest Level* fields
![](zoho-crm-report-resources/1.png)
![](zoho-crm-report-resources/2.png)

# Workflow Rule
![](zoho-crm-report-resources/3.png)
![](zoho-crm-report-resources/4.png)
![](zoho-crm-report-resources/5.png)
![](zoho-crm-report-resources/6.png)

# Schedules
![](zoho-crm-report-resources/7.png)
![](zoho-crm-report-resources/8.png)
![](zoho-crm-report-resources/9.png)
![](zoho-crm-report-resources/10.png)

Function name: Send Mail - Cold
```
contactList = zoho.crm.getRecords("Contacts");
for each contact in contactList
{
	interestLevel = contact.get("Interest_Level");
	emailSequence = contact.get("Email_Sequence");
	if(interestLevel != "Cold" || emailSequence == "0" || emailSequence == null)
	{
		continue;
	}
	fullName = contact.get("Full_Name");
	id = contact.get("id");
	sendmail
	[
		from :zoho.loginuserid
		to :contact.get("Email")
		subject :"This is a test email for " + fullName
		message :""
		.concat("<h1>Dear " + fullName + ",</h1>")
		.concat("<p>")
		.concat("This is a test message. ")
		.concat("<br>")
		.concat("Your current interest level is " + interestLevel + ".")
		.concat("</p>")
		.concat("<br>")
		.concat("<a href='https://flow.zoho.com/737611184/flow/webhook/incoming?zapikey=1001.83db607ff5f499304bd3ffb0d6e05911.61dd51c01bad55f5cf21ccd5de1ec131&isdebug=false&contact="+id+"'><button>Show more interest</button></a>")
	]
	body = Map();
	body.put("Email_Sequence",toString(emailSequence.toNumber() - 1));
	res = zoho.crm.updateRecord("Contacts",id,body);
}
```
The **Send Mail - Warm** and **Send Mail - Hot** are the same, except that the condition **interestLevel != "Cold"** uses "Warm" and "Cold" respectively. 

![](zoho-crm-report-resources/11.png)

- In *Recent Executions*, we can see that our webhook was triggered from the click button action from the email sent. Note that the *Failure* executions happened during testing. 
![](zoho-crm-report-resources/12.png)


### Best Practices: Separate HTML Template
Instead of hardcoding the Webhook URL in the Custom Function, the html code can be written from a NodeJS microservice and fetched deluge's getUrl method. Thus, principles to be applied: Separation of Concern, Low Coupling, etc. This will make the html template more testable and maintainable as well.

# Flow