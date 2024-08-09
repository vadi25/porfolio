import { Button } from "@/components/ui/button"
import { MailOpenIcon } from "lucide-react"


function Home() {
  return (
    <div className="bg-background text-foreground">
      <header className="container mx-auto py-8 px-4 md:py-12 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">Javier Sanchez Vadillo</h1>
          <p className="max-w-[600px] text-muted-foreground md:text-xl">
            I build cool stuff on the web and use data to make it even cooler
          </p>
          <div className="flex items-center gap-2 text-sm">
            <MailOpenIcon className="h-4 w-4 text-muted-foreground" />
            <a href="#" className="underline underline-offset-4">
              javiersvadillo@gmail.com
            </a>
          </div>
        </div>
      </header>
      <section className="container mx-auto py-12 px-4 md:py-16 md:px-6">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-2xl font-bold">Skills</h2>
            <div className="grid gap-6">
              <div>
                <h3 className="mb-2 text-lg font-semibold">Web Development</h3>
                <h1>CHART</h1>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold">Data Analysis</h3>
                <h1>CHART</h1>
              </div>
            </div>
          </div>
          <div>
            <h2 className="mb-4 text-2xl font-bold">Projects</h2>
            <div className="grid gap-6">
              <div>
                <img
                  src="/placeholder.svg"
                  width="300"
                  height="200"
                  alt="Project 1"
                  className="mb-2 rounded-lg"
                  style={{ aspectRatio: "300/200", objectFit: "cover" }}
                />
                <h3 className="mb-1 text-lg font-semibold">Project 1</h3>
                <p className="text-muted-foreground">
                  A responsive web application built with React and Node.js, featuring a modern design and intuitive
                  user experience.
                </p>
              </div>
              <div>
                <img
                  src="/placeholder.svg"
                  width="300"
                  height="200"
                  alt="Project 2"
                  className="mb-2 rounded-lg"
                  style={{ aspectRatio: "300/200", objectFit: "cover" }}
                />
                <h3 className="mb-1 text-lg font-semibold">Project 2</h3>
                <p className="text-muted-foreground">
                  A data visualization dashboard built with Python and Tableau, providing insights into complex business
                  data.
                </p>
              </div>
              <div>
                <img
                  src="/placeholder.svg"
                  width="300"
                  height="200"
                  alt="Project 3"
                  className="mb-2 rounded-lg"
                  style={{ aspectRatio: "300/200", objectFit: "cover" }}
                />
                <h3 className="mb-1 text-lg font-semibold">Project 3</h3>
                <p className="text-muted-foreground">
                  A machine learning model developed with Python and TensorFlow, used for predictive analytics in the
                  finance industry.
                </p>
              </div>
              <Button variant="outline" className="mx-auto">
                See more
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className="container mx-auto py-12 px-4 md:py-16 md:px-6">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-2xl font-bold">Experience</h2>
            <div className="grid gap-6">
              <div>
                <h3 className="mb-2 text-lg font-semibold">Web Developer</h3>
                <p className="text-muted-foreground">Acme Inc. | 2018 - Present</p>
                <p className="text-muted-foreground">
                  Developed and maintained responsive web applications using React, Node.js, and various front-end and
                  back-end technologies. Collaborated with cross-functional teams to deliver high-quality, user-centric
                  solutions.
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold">Data Analyst</h3>
                <p className="text-muted-foreground">XYZ Corporation | 2015 - 2018</p>
                <p className="text-muted-foreground">
                  Analyzed complex business data using Python, SQL, and data visualization tools. Provided insights and
                  recommendations to help drive strategic decision-making.
                </p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="mb-4 text-2xl font-bold">Education</h2>
            <div className="grid gap-6">
              <div>
                <h3 className="mb-2 text-lg font-semibold">Degree in Business Analytics</h3>
                <p className="text-muted-foreground">Francisco de Vitoria University | 2021 - 2025</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="bg-muted py-6 text-center text-muted-foreground">
        <p>&copy; 2024 John Doe. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Home
