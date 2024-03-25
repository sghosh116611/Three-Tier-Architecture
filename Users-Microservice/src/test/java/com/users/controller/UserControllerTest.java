package com.users.controller;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

import java.util.Arrays;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;

import com.users.model.User;

@ExtendWith(MockitoExtension.class)
public class UserControllerTest {

	@Mock
	private MongoTemplate mongoTemplate;

	@InjectMocks
	private UserController userController;

	private MockMvc mockMvc;

	@Test
	public void testGetUsers() throws Exception {
		// Mock data
		User user1 = new User("Ram", 30, 2, 100);
		User user2 = new User("Shyam", 22, 10, 500);
		when(mongoTemplate.find(new Query(), User.class)).thenReturn(Arrays.asList(user1, user2));

		// Set up MockMvc
		mockMvc = MockMvcBuilders.standaloneSetup(userController).build();

		// Perform GET request and verify response
		mockMvc.perform(get("/users")).andExpect(status().isOk()).andExpect(content().json(
				"[{\"name\":\"Ram\",\"age\":30,\"numberOfBooks\":2,\"price\":100},{\"name\":\"Shyam\",\"age\":22,\"numberOfBooks\":10,\"price\":500}]"));
	}
}
