import { Button } from "@/components/ui/button"
import { ChartArea, MailOpenIcon } from "lucide-react"


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
                <a href="https://unicourse.education" target="_blank" rel="noreferrer">
                  <img
                    src="/placeholder.svg"
                    width="300"
                    height="200"
                    alt="Project 1"
                    className="mb-2 rounded-lg"
                    style={{ aspectRatio: "300/200", objectFit: "cover" }}
                  />
                
                  <h3 className="mb-1 text-lg font-semibold underline underline-offset-2">Unicourse</h3>
                </a>
                <p className="text-muted-foreground">
                  React, Next JS and Tailwind CSS web based course marketplace, for students to teach other students.
                </p>
              </div>
              <div>
                <a href="https://github.com/vadi25/practica-final-data" target="_blank" rel="noreferrer">
                  <img
                    src="/placeholder.svg"
                    width="300"
                    height="200"
                    alt="Project 2"
                    className="mb-2 rounded-lg"
                    style={{ aspectRatio: "300/200", objectFit: "cover" }}
                  />
                  <h3 className="mb-1 text-lg font-semibold underline underline-offset-2">Dashboard on Data Jobs</h3>
                </a>
                <p className="text-muted-foreground">
                  A data visualization dashboard built with Pyhton and Streamlit, providing insights into jobs and salaries in the Data industry.
                </p>
              </div>

              {/*
              MORE PROJECTS AND SEE MORE OPTION
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
              </Button>**/}
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
                <p className="text-muted-foreground">Self Employed | 2023 - Present</p>
                <p className="text-muted-foreground">
                  Developed and maintained responsive web applications using React, Next JS and Tailwind CSS. Created internal tools for companies to manage their data and full stack applications.
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold">Real State Agent</h3>
                <p className="text-muted-foreground">2021 - Present</p>
                <p className="text-muted-foreground">
                  Sold properties, with a combined value of over €12 million. Improved closing rates by over 100% with non-spanish speaking clients.
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
        <p>&copy; 2024 Javier Sanchez Vadillo. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Home
