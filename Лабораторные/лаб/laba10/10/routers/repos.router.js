const router = require("express").Router();
const reposRouter = require("../controllers/repos.controller");

router.get('/admin/repos-with-commits', reposRouter.getAllReposWithCommitsForAdmin);
router.get('/user/:userId/repos-with-commits', reposRouter.getAllReposWithCommitsForUser);
router.get('/author/:authorId/commits', reposRouter.getAllCommitsByAuthor);

router.get("/", reposRouter.getAllRepos);
router.get("/:id", reposRouter.getRepoById);
router.post("/", reposRouter.createRepo);
router.put("/:id", reposRouter.updateRepoById);
router.delete("/:id", reposRouter.deleteRepoById);
router.get("/:id/commits", reposRouter.getReposByIdIncludeCommits);
router.get("/:id/commits/:commitId", reposRouter.getReposByIdIncludeCommit);
router.post("/:id/commits", reposRouter.createCommit);
router.put("/:id/commits/:commitId", reposRouter.updateCommitById);
router.delete("/:id/commits/:commitId", reposRouter.deleteCommitById);

module.exports = router;
