# Requirements
- Different types of contact (aka. customer?): Residential, Commercial, Farm

- Different levels of interest: Cold, Warm, Hot

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
- Structure layout:
    - Contact Basic Information (inc. firstname: Single Line, lastname: Single Line, email: Email)
    - Contact Type: Pick List field
    - Contact Interest Level: Pick List field

- For email automation, use workflow automation
- Create workflow rule for Contacts module
- Rule Trigger: On every Wednesday, send email based on the given criteria
- Webhook: On call, upgrade contact's interest level
    - https://help.zoho.com/portal/en/community/topic/email-from-template-triggered-by-custom-button
    - https://help.zoho.com/portal/en/community/topic/instant-access-to-a-lead-from-a-link-in-the-email-template