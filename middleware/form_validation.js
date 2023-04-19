const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


const form_validation = (req, res, next) => {
    let { input_name, input_email, input_pass, input_pass2 } = req.body;

    let errors = [];

    if(!input_name || !input_email || !input_pass || !input_pass2)
    {
        errors.push({message: "Please enter all fields"});
    }
    
    if(input_pass.length < 6)
    {
        errors.push({message: "Password should be at least 6 characters long"});
    }

    if(input_pass != input_pass2)
    {
        errors.push({message: "Passwords do not match"});
    }

    if(!input_email.match(mailformat))
    {
        errors.push({message: "Please enter valid email"});
    }

    if(errors.length > 0)
    {
        res.status(400).render('homepage', { errors });
    }
    else
    {
        res.send(req.body);
    }
}

module.exports = form_validation;