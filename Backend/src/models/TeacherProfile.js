const db = require("../services/db");

// Create a teacher profile
async function createTeacherProfile(teacherProfileData) {
	const query = `INSERT INTO TeacherProfile 
    (teacher_id, target_id, mail, phone_number, experience, level, tution, address, available_day)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
	const values = [
		teacherProfileData.teacher_id,
		teacherProfileData.target_id,
		teacherProfileData.mail,
		teacherProfileData.phone_number,
		teacherProfileData.experience,
		teacherProfileData.level,
		teacherProfileData.tution,
		teacherProfileData.address,
		teacherProfileData.available_day,
	];

	try {
		const result = await db.query(query, values);
		return result;
	} catch (error) {
		console.error("Error creating teacher profile:", error);
		throw error;
	}
}

// Get all teacher profiles
async function getAllTeacherProfiles() {
	const query = `SELECT * FROM TeacherProfile`;

	try {
		const teacherProfiles = await db.query(query);
		return teacherProfiles;
	} catch (error) {
		console.error("Error getting teacher profiles:", error);
		throw error;
	}
}

// Get all teacher profiles
async function getAllDetailTeacherProfile() {
	const query = `SELECT
  TeacherProfile.id,
  TeacherProfile.teacher_id,
  TeacherProfile.target_id,
  TeacherProfile.mail,
  TeacherProfile.phone_number,
  TeacherProfile.experience,
  TeacherProfile.level,
  TeacherProfile.tution,
  TeacherProfile.address,
  TeacherProfile.available_day,
  User.user_name,
  User.first_name,
  User.last_name,
  User.sex,
  User.age
FROM
  TeacherProfile
JOIN
  User ON TeacherProfile.teacher_id = User.id
`;

	try {
		const teacherProfiles = await db.query(query);
		return teacherProfiles;
	} catch (error) {
		console.error("Error getting all detail teacher profiles:", error);
		throw error;
	}
}

// Get a teacher profile by ID
async function getDetailTeacherProfileById(teacherProfileId) {
	const query = `SELECT
  TeacherProfile.id,
  TeacherProfile.teacher_id,
  TeacherProfile.target_id,
  TeacherProfile.mail,
  TeacherProfile.phone_number,
  TeacherProfile.experience,
  TeacherProfile.level,
  TeacherProfile.tution,
  TeacherProfile.address,
  TeacherProfile.available_day,
  User.user_name,
  User.first_name,
  User.last_name,
  User.sex,
  User.age
FROM
  TeacherProfile
JOIN
  User ON TeacherProfile.teacher_id = User.id
WHERE
	User.id = ?
`;
	const values = [teacherProfileId];

	try {
		const teacherProfile = await db.query(query, values);
		if (teacherProfile.length === 0) {
			throw new Error("Teacher profile not found");
		}
		return teacherProfile[0];
	} catch (error) {
		console.error("Error getting teacher profile:", error);
		throw error;
	}
}

// Get a teacher profile by ID
async function getTeacherProfileById(teacherProfileId) {
	const query = `SELECT * FROM TeacherProfile WHERE id = ?`;
	const values = [teacherProfileId];

	try {
		const teacherProfile = await db.query(query, values);
		if (teacherProfile.length === 0) {
			throw new Error("Teacher profile not found");
		}
		return teacherProfile[0];
	} catch (error) {
		console.error("Error getting teacher profile:", error);
		throw error;
	}
}

// Update a teacher profile
async function updateTeacherProfile(teacherProfileId, teacherProfileData) {
	try {
		const query = `UPDATE TeacherProfile SET 
    teacher_id = ?, target_id = ?, mail = ?, phone_number = ?, 
    experience = ?, level = ?, tution = ?, address = ?, available_day = ?
    WHERE id = ?`;

		const data = await getTeacherProfileById(teacherProfileId);
		const values = [
			teacherProfileData.teacher_id || data.teacher_id,
			teacherProfileData.target_id || data.target_id,
			teacherProfileData.mail || data.mail,
			teacherProfileData.phone_number || data.phone_number,
			teacherProfileData.experience || data.experience,
			teacherProfileData.level || data.level,
			teacherProfileData.tution || data.tution,
			teacherProfileData.address || data.address,
			teacherProfileData.available_day || data.available_day,
			teacherProfileId,
		];

		const result = await db.query(query, values);
		return result;
	} catch (error) {
		console.error("Error updating teacher profile:", error);
		throw error;
	}
}

// Delete a teacher profile
async function deleteTeacherProfile(teacherProfileId) {
	const query = `DELETE FROM TeacherProfile WHERE id = ?`;
	const values = [teacherProfileId];

	try {
		const result = await db.query(query, values);
		return result;
	} catch (error) {
		console.error("Error deleting teacher profile:", error);
		throw error;
	}
}

module.exports = {
	createTeacherProfile,
	getAllTeacherProfiles,
	getTeacherProfileById,
	updateTeacherProfile,
	deleteTeacherProfile,
	getAllDetailTeacherProfile,
	getDetailTeacherProfileById,
};
