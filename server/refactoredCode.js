
/**
 * Part 2 - Refactor code 
 * Author: Tamir Yakar
 */


// Q & A
/*
  Q: What do you think is wrong with the code, if anything?
  A: well, from reading the code, it was hard to understand the flow of the code.
     and this type of code is hard to maintain.

  Q: Can you see any potential problems that could lead to exceptions
  A: yes, thier is no validations on params, no use of try & catch.

  Q: How would you refactor this code to:
    * Make it easier to read
    * Increase code reusability
    * Improve the stability of the system
    * Improve the testability of the code
  
  A: * split the logic to smaller functions would make it more maintainable and we can reuse the functions.
     * for stability we can use of try & catch so if their is an erorr it will not fail our system.
     * once the code is splited to smaller functions we can test each function separately.

  
  Q: How might you use the latest JavaScript features to refactor the code?
  A: well, i would use ES6 features and functions like: async await and spread operators.

*/

/**
 *   
 *  Refactored Code
 */

// update user
/**
 * @returns Promise
 */
function updateUser(authId,email){
    try {
        return User.findOneAndUpdate({authId}, 
            { authId,email },
            { upsert: true, new: true }).exec();
    } catch(err) {
        return err;
    }
};

// find shop by id
/**
 * @returns Promise
 */
function findShopById(shopId){
    try {
        return Shop.findById(shopId).exec();
    } catch(err) {
        return err;
    }
}

/**
 *  refactored code
 */
exports.inviteUserRefactor = async(req, res)=>{
    // get the request params
    const invitationBody = req.body;
    // validatedInvitationBody is function to validated the params
    if(!validatedInvitationBody(invitationBody)){
        return res.status(500).json({ message: 'Invitation Body Wrong' });
    }

    // get the shop ID
    const shopId = req.params.shopId;
    // auth url
    const authUrl = "https://url.to.auth.system.com/invitation";

    try {
        // Get the shop
        const shop = await findShopById(shopId);
        // if no shop exsits
        if (!shop) {
            return res.status(500).send({ message: 'No Shop Found' });
        }

        // make a call to auth url with invitationBody
        const invitationResponse = await superagent.post(authUrl).send(invitationBody);
        // if invitationResponse.status eq to 201
        if (invitationResponse.status === 201) {
              // extract the params from invitationResponse body
              const { authId, invitationId  } = invitationResponse.body;
              // update the user
              const createdUser = await updateUser(authId, invitationBody.email);
              // if no user exsits
              if (!createdUser) {
                return res.status(500).send({ message: 'No User Found' });
              }             
              
              // update invitations if not exsits 
              if (!shop.invitations.includes(invitationId)) {
                shop.invitations.push(invitationId);
              }

              // update users if not exsits
              if (!shop.users.includes(createdUser._id)) {
                shop.users.push(createdUser);
              }

              // save shop
              await shop.save();
          // if invitationResponse.status eq to 200    
        } else if (invitationResponse.status === 200) {
          // send error response
            return res.status(400).json({
              error: true,
              message: 'User already invited to this shop'
            });
          }
          // send back the invitationResponse
        return res.json(invitationResponse);
      } catch (err) {
          // send error response
        return res.status(500).send(err);
      }
}