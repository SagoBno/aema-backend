import UserAnswer from "../db/models/UserAnswer.js";

async function create(userAnswer) {
    try {
        const createdUserAnswer = await UserAnswer.create(userAnswer);
        return createdUserAnswer;
    } catch (error) {
        throw error;
    }
};

async function find(userAnswerId) {
    try {
        const userAnswer = await UserAnswer.findByPk(userAnswerId);
        return userAnswer;
    } catch (error) {
        throw error;
    }
};

async function getAll(userId) {
    try {
        const userAnswers = await UserAnswer.findAll({ where: { userId } });
        return userAnswers;
    } catch (error) {
        throw error;
    }
};

async function update(userAnswer) {
    try {
        const updatedUserAnswer = await UserAnswer.update(userAnswer, {
            where: {
                userId: userAnswer.userId,
            }
        });
        return updatedUserAnswer;
    } catch (error) {
        throw error;
    }
};

async function remove(userAnswerId) {
    try {
        const deletedUserAnswer = await UserAnswer.destroy({
            where: {
                userId: userAnswerId,
            }
        });
        return deletedUserAnswer;
    } catch (error) {
        throw error;
    }
};

export default {
    create,
    find,
    getAll,
    update,
    remove,
};
