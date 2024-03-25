package com.users.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.users.model.User;

@RestController
class UserController {

    @Autowired
    private MongoTemplate mongoTemplate;

    // Save users
    @GetMapping("/users/save")
    public String saveUsers() {
    	mongoTemplate.save(new User("Ram",30,2,100));
    	mongoTemplate.save(new User("Shyam", 22,10,500));
    	
    	return "Users Saved!";
    }
    
    // Get Users
    @GetMapping("/users")
    public List<User> getUsers() {
        // Fetch users from MongoDB and return them
        return mongoTemplate.find(new Query(), User.class);
    }
}
