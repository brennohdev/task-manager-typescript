import { Member } from '../entities/Member';
import { Types } from 'mongoose';

export interface IMemberRepository {
  add(member: Omit<Member, 'id'>): Promise<Member>;
  findMemberByWorkspace(workspaceId: string): Promise<Member[]>;
  findByUserId(userId: string): Promise<Member[]>;
  remove(memberId: string): Promise<void>;
}
