import { Probot} from "probot";
import type { ApplicationFunctionOptions } from "probot";

import * as express from "express";
export default (app: Probot,{ getRouter }:ApplicationFunctionOptions) => {
  // Add a simple GET route on /ping
  if(!getRouter) return;

  const router = getRouter();
  router.use(express.static("public"));
  
  router.get("/test", (_req: express.Request, res: express.Response) => {
    res.send("paing");
  });
  

  app.on("issues.opened", async (context) => {
    const issueComment = context.issue({
      body: "Thanks for opening this Issue!",
    });
    await context.octokit.issues.createComment(issueComment);
  });
};
