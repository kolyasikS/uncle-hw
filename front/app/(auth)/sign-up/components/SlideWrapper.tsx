import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  description: string;
  onSubmit?: () => void;
  className?: string;
  children?: React.ReactNode;
};
const SlideWrapper = ({
  title,
  description,
  onSubmit,
  className,
  children,
  ...props
}: Props) => {
  return (
    <div className={cn("flex flex-col gap-6 h-full", className)} {...props}>
      <Card className={"h-full rounded-none"}>
        <CardHeader className={"mb-2"}>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className={"h-full"}>
          <form onSubmit={onSubmit} className={"h-full"}>
            {children}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SlideWrapper;
