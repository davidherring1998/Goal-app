const router = require('express').Router();
const {getGoals, addGoal, updateGoal, deleteGoal} = require('../Controllers/goals');

router.route('/').get(getGoals);
router.route('/').post(addGoal);
router.route('/:id').put(updateGoal);
router.route('/:id').delete(deleteGoal);


module.exports = router;