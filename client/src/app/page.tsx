import { Button } from '@/components/ui/button';
// app/page.tsx
export default function Home() {
  return (
    <div className="gap-4">
      <Button>Primary</Button>
      <Button variant="secondary" size="default">Secundary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="muted">Muted</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="teritrary">Teritrary</Button>
    </div>
  );
}
