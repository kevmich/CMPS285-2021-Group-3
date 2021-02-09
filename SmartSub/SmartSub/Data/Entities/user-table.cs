using System;
namespace SmartSub.Data.Entities
public class UserTableDTO
{
    public int Id { get; set; }             //user info
    public string FirstName { get; set; }   //first name
    public string LastName { get; set; }    //last name
    public string Username { get; set; }    //username
    public string Email { get; set; }       //user email
    public string Role { get; set; }        //???
}
