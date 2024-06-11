const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class ReposService {
  async getAllReposWithCommits() {
    return prisma.repos.findMany({
      include: { Commits: true },
    });
  }

  async getAllReposWithCommitsForUser(userId) {
    return prisma.repos.findMany({
      where: { authorId: parseInt(userId) },
      include: { Commits: true },
    });
  }

  async getAllCommitsByAuthor(authorId) {
    const commits = await prisma.commits.findMany({
      where: { authorId: parseInt(authorId) },
      include: { Repo: true },
    });
    return commits;
  }

  async getAllRepos() {
    return prisma.repos.findMany();
  }

  async getRepoById(id) {
    const repo = await prisma.repos.findUnique({
      where: { id: parseInt(id) },
    });
    if (!repo) {
      throw new Error("Repo with this Id is not found");
    }
    return repo;
  }

  async createRepo(data) {
    if (!data.name) throw new Error("Missing data");
    const isRepoExist = await prisma.repos.findMany({
      where: { name: data.name },
    });
    if (isRepoExist.length) throw new Error("Repo already exists");

    return prisma.repos.create({
      data: {
        name: data.name,
        authorId: parseInt(data.authorId),
      },
    });
  }

  async updateRepoById(id, newData, userId) {
    const repo = await prisma.repos.findUnique({
      where: { id: parseInt(id) },
    });
    if (!repo) throw new Error("Repo with this Id is not found");
    if (parseInt(userId) !== parseInt(repo.authorId)) {
      throw new Error("User is not allowed to update this repo");
    }

    const isRepoExist = await prisma.repos.findMany({
      where: { name: newData.name },
    });
    if (isRepoExist.length) throw new Error("Repo already exists");

    return prisma.repos.update({
      where: { id: parseInt(id) },
      data: {
        name: newData.name,
        authorId: parseInt(userId),
      },
    });
  }

  async deleteRepoById(id, userId) {
    const repo = await prisma.repos.findUnique({
      where: { id: parseInt(id) },
    });
    if (parseInt(userId) !== parseInt(repo.authorId)) {
      throw new Error("User is not allowed to delete this repo");
    }

    await prisma.commits.deleteMany({
      where: { repoId: parseInt(id) },
    });

    return prisma.repos.delete({
      where: { id: parseInt(id) },
    });
  }

  async getReposByIdIncludeCommits(id, userId, userRole) {
    if (!(await this.checkAccess(userRole, userId, id))) {
      throw new Error("User is not allowed to access commits of this repo");
    }

    return prisma.repos.findUnique({
      where: { id: parseInt(id) },
      include: { Commits: true },
    });
  }

  async getReposByIdIncludeCommit(idRepos, userId, userRole, idCommit) {
    if (!(await this.checkAccess(userRole, userId, idRepos, idCommit))) {
      throw new Error("User is not allowed to access commits of this repo");
    }

    return prisma.repos.findUnique({
      where: { id: parseInt(idRepos) },
      include: {
        Commits: {
          where: { id: parseInt(idCommit) },
        },
      },
    });
  }

  async createCommit(data) {
    if (!data.message || !data.repoId) throw new Error("Missing data");
    if (!(await this.checkAccess(data.userRole, data.userId, data.repoId))) {
      throw new Error("User is not allowed to create commit in this repo");
    }

    const isCommitExist = await prisma.commits.findMany({
      where: { message: data.message },
    });
    if (isCommitExist.length) throw new Error("Commit already exists");

    return prisma.commits.create({
      data: {
        message: data.message,
        repoId: parseInt(data.repoId),
        authorId: data.userId,
      },
    });
  }

  async updateCommitById(data) {
    const { id, commitId, userId, repoId, userRole } = data;
    const commit = await prisma.commits.findUnique({
      where: { id: parseInt(commitId) },
    });
    if (!commit) throw new Error("Commit with this Id is not found");

    if (!(await this.checkAccess(userRole, userId, repoId, commitId))) {
      throw new Error("User is not allowed to update commit in this repo");
    }

    const isCommitExist = await prisma.commits.findMany({
      where: { message: data.message },
    });
    if (isCommitExist.length) throw new Error("Commit already exists");

    const authorId =
      userRole === "admin" && data.newAuthorId
        ? parseInt(data.newAuthorId)
        : parseInt(userId);

    return prisma.commits.update({
      where: { id: parseInt(commitId) },
      data: {
        message: data.message,
        repoId: parseInt(repoId),
        authorId,
      },
    });
  }

  async deleteCommitById(data) {
    const { id, commitId, userId, userRole } = data;
    const commit = await prisma.commits.findUnique({
      where: { id: parseInt(commitId) },
    });
    if (!commit) throw new Error("Commit with this Id is not found");

    if (!(await this.checkAccess(userRole, userId, id, commitId))) {
      throw new Error("User is not allowed to delete commit in this repo");
    }

    return prisma.commits.delete({
      where: { id: parseInt(commitId) },
    });
  }

  async checkAccess(role, userId, repoId, commitId) {
    if (role === "admin") return true;

    const repo = await prisma.repos.findUnique({
      where: { id: parseInt(repoId) },
    });

    if (parseInt(userId) === parseInt(repo.authorId)) return true;

    if (commitId) {
      const commit = await prisma.commits.findUnique({
        where: { id: parseInt(commitId) },
      });
      if (parseInt(userId) === parseInt(commit.authorId)) return true;
    }

    return false;
  }
}

module.exports = new ReposService();
