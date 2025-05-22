import { Probot, ApplicationFunctionOptions} from "probot";
import { Response } from "express";
import * as express from "express";
export default (app: Probot,{ getRouter }:ApplicationFunctionOptions) => {
  // Add a simple GET route on /ping
  if(!getRouter) return;

  const router = getRouter();
  router.use(express.static("public"));

  router.get("/ping", (res: Response) => {
    res.send("pong");
  });

  app.on("issues.opened", async (context) => {
    const issueComment = context.issue({
      body: "Thanks for opening this Issue!",
    });
    await context.octokit.issues.createComment(issueComment);
  });
};
