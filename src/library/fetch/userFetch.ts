import { UserModel } from "../../models/userModel";

export async function fetchUsers() {
	try {
		const response = await fetch('http://localhost:8080/users.php');
		if (!response.ok) {
			return ({ "error": "error" })
		}
		const data = await response.json();
		return data
	} catch (error) {
		return ({ "error": "db error" })
	}
};

export async function deleteUser(id: number) {
	try {
		const response = await fetch(`http://localhost:8080/users.php/?userid=${id}`, {
			method: "DELETE"
		})
		return response;
	}
	catch (error) {
		return ({ "error": error });
	}
};

export async function fetchNewUser(event: MouseEvent, username: string, age: number) {
	if (event) {
		event.preventDefault()
	}

	const userObject: UserModel = {
		userid: 0,
		username: username,
		age: age
	}
	const formdata = new FormData();

	for (const key in userObject) {
		formdata.append(key, userObject[key as keyof UserModel].toString());
	}

	try {
		const response = await fetch('http://localhost:8080/users.php', {
			method: "POST",
			body: formdata
		});
		if (!response.ok) {
			console.log("error");
		}
	} catch (error) {
		console.error("error: ", error);
	}
}
