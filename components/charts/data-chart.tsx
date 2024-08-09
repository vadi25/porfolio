import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import exp from "constants"
import { Power } from "lucide-react"
import { Bar, BarChart, Pie, PieChart } from "recharts"


const chartData = [
    { skill: "Power Bi / Tableau", count: 70, fill: "var(--color-chrome)" },
    { skill: "Excel", count: 40, fill: "var(--color-safari)" },
    { skill: "R", count: 50, fill: "var(--color-firefox)" },
    { skill: "Python", count: 80, fill: "var(--color-edge)" },
    { skill: "SQL", count: 75, fill: "var(--color-other)" },
  ]

const chartConfig = {
    count: {
      label: "Skills",
    },
    powerBI: {
      label: "Power Bi / Tableau",
      color: "hsl(var(--chart-1))",
    },
    excel: {
      label: "Excel",
      color: "hsl(var(--chart-2))",
    },
    r: {
      label: "R",
      color: "hsl(var(--chart-3))",
    },
    python: {
      label: "Python",
      color: "hsl(var(--chart-4))",
    },
    sql: {
      label: "SQL",
      color: "hsl(var(--chart-5))",
    },
  } satisfies ChartConfig


export function PiechartDataChart() {
    return (
        <ChartContainer
          config={chartConfig}
          className="aspect-square"
        >
            <PieChart>
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Pie
                    data={chartData}
                    dataKey="count"
                    nameKey="skill"
                />
            </PieChart>
        </ChartContainer>
    )
}