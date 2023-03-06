# Buddy Savings

This is sample project for group savings plan. Group admins can add as many users as possible within the set limit. Invitation are sent to users who can choose to accept or ignore the invitation

## Installation

```shell
npm install
```

```shell
npm run dev
```

## Endpoints

This section provides a brief over view of the endpoints. For complete information about the API(s) access the postman [collections here](https://documenter.getpostman.com/view/23840193/2s93JnW7kf)

### **User Endpoints**

This is used to store users information in the database

| Title            | Description       | Endpoint | Input    |Authorization  |
| :---             |    :----:           |    :----: |    :----:        |          ---: |
| Register         | Create a new user record| ```POST: /api/user/register``` | ```body: CreateUserDto``` | none |
| Login         | Create access token for user| ```POST: /api/user/login``` | ```body: LoginDto``` | none |
| Find User BY Id         | Retrieves user record| ```GET: /api/user/:userId``` | none | Global Auth |
| Current User         | Retrieves logged in user record| ```GET: /api/user/current-user``` | none |  Global Auth |

***

#### **Savings Plan Endpoints**

This is used to create savings plan that users can join

| Title            | Description       | Endpoint | Input    |Authorization  |
| :---             |    :----:           |    :----: |    :----:        |          ---: |
| Create Savings Plan         | Create a new saving plan record| ```POST: /api/saving-plan/create``` | ```body: SavingPlanDto``` | Global Auth and Admin Auth |
| Find Savings Plan By Id         | Retrieves single saving plan | ```GET: /api/saving-plan/:planId``` | none | Global Auth |
| Find All Savings Plan         | Retrieves all saving plan record| ```GET: /api/saving-plan``` | none | Global Auth |

***

#### **Savings Group Endpoints**

This is used to group users under a savings plan

| Title            | Description       | Endpoint | Input    |Authorization  |
| :---             |    :----:           |    :----: |    :----:        |          ---: |
| Add User to Savings Plan         | add a user to and existing plan| ```POST: /api/savings-group/add/:userId/:planId``` | ```param: planId, userId``` | Global Auth and Admin Auth |
| Accept or Reject Invite to Group        | Updates user invite status on for the saving| ```GET: /api/savings-group/invite:planId``` | ```params: planId; query: status``` | Global Auth |
| Find All Users under a Savings Plan   |Retrieves allUsers under a Savings Plan| ```GET: /api/savings-group/pla/:planId``` | ```params: planId```  | Global Auth |
