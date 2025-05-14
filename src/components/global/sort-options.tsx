"use client";

import { ArrowUpDownIcon, BarChartIcon, ClockIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useHomepageParams } from "@/hooks/use-homepage-params";
import { cn } from "@/lib/utils";

export function SortOptions() {
  const options: {
    value: "trending" | "most-voted" | "recent";
    label: string;
    icon: React.ReactNode;
  }[] = [
    {
      value: "trending",
      label: "Trending",
      icon: <ArrowUpDownIcon className="h-4 w-4" />,
    },
    {
      value: "most-voted",
      label: "Most Voted",
      icon: <BarChartIcon className="h-4 w-4" />,
    },
    {
      value: "recent",
      label: "Recent",
      icon: <ClockIcon className="h-4 w-4" />,
    },
  ];

  const { sort, setParams } = useHomepageParams();

  return (
    <div className="flex flex-wrap gap-2">
      {options.map(option => (
        <Button
          key={option.value}
          variant={sort === option.value ? "default" : "outline"}
          size="sm"
          onClick={() => setParams({ sort: option.value })}
          className={cn(
            "transition-all",
            sort === option.value
              ? "bg-primary text-primary-foreground"
              : "bg-background text-foreground hover:bg-muted",
          )}
        >
          {option.icon}
          <span>{option.label}</span>
        </Button>
      ))}
    </div>
  );
}
