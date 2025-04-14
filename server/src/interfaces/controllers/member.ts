import { z } from 'zod';
import { asyncHandler } from '../../infrastructure/middlewares/asyncHandler';
import { Request, Response } from 'express';
import { HTTPSTATUS } from '../../infrastructure/config/http';
import { addMemberByInviteCodeService } from '../../application/services/member';

export const joinWorkspace = asyncHandler(async (req: Request, res: Response) => {
  const inviteCode = z.string().parse(req.params.inviteCode);
  const userId = req.user!.id;

  const { workspaceId } = await addMemberByInviteCodeService(userId, inviteCode);

  return res.status(HTTPSTATUS.OK).json({
    message: 'Successfully joined the workspace',
    workspaceId,
  });
});
