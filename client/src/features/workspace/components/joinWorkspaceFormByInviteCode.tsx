import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useJoinWorkspace } from "@/features/workspace/hooks/useJoinWorkspace";

export const JoinWorkspaceCard = () => {
  const [inviteCode, setInviteCode] = useState('');
  const { mutate: joinWorkspace, isPending } = useJoinWorkspace();

  const handleJoin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    if (!inviteCode.trim()) return;
    joinWorkspace(inviteCode.trim());
  };

  return (
    <Card className="w-full h-full border-none shadow-none mt-8">
      <CardHeader className="p-7">
        <CardTitle className="text-xl font-bold">Join a workspace by invite code</CardTitle>
        <CardDescription>Got an invite code? Enter it below to join a workspace.</CardDescription>
      </CardHeader>
      <CardContent className="p-7">
        <form onSubmit={handleJoin} className="space-y-4">
          <Input
            type="text"
            placeholder="Enter invite code"
            value={inviteCode}
            onChange={(e) => setInviteCode(e.target.value)}
          />
          <Button type="submit" size="lg" disabled={isPending}>
            {isPending ? "Joining..." : "Join"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
