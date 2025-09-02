import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => (
  <div className="min-h-screen flex flex-col bg-background">
    <Header />
    <main className="container mx-auto flex-1 p-6">
      <h1 className="mb-4 text-2xl font-bold">About</h1>
      <p>Funky Success helps you discover books and ideas to grow.</p>
    </main>
    <Footer />
  </div>
);

export default About;
