from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import re

# Curated dictionary of real tech skills / tools / frameworks
KNOWN_SKILLS = {
    # Programming Languages
    "python", "java", "javascript", "typescript", "c", "c++", "c#", "go", "golang",
    "rust", "ruby", "php", "swift", "kotlin", "scala", "perl", "r", "matlab",
    "dart", "lua", "haskell", "elixir", "clojure", "objective-c", "shell", "bash",
    "powershell", "sql", "nosql", "graphql", "assembly",

    # Web Frontend
    "html", "html5", "css", "css3", "sass", "scss", "less", "tailwind", "tailwindcss",
    "bootstrap", "react", "reactjs", "react.js", "angular", "angularjs", "vue", "vuejs",
    "vue.js", "svelte", "nextjs", "next.js", "nuxt", "nuxtjs", "gatsby", "jquery",
    "webpack", "vite", "babel", "eslint", "prettier", "redux", "zustand", "mobx",
    "material-ui", "mui", "chakra", "ant-design", "storybook",

    # Web Backend
    "node", "nodejs", "node.js", "express", "expressjs", "fastapi", "flask", "django",
    "spring", "springboot", "spring-boot", "rails", "ruby-on-rails", "laravel", "symfony",
    "asp.net", ".net", "dotnet", "nestjs", "koa", "hapi", "gin", "fiber", "actix",

    # Databases
    "mongodb", "mysql", "postgresql", "postgres", "sqlite", "oracle", "mariadb",
    "redis", "elasticsearch", "cassandra", "dynamodb", "couchdb", "neo4j", "firebase",
    "firestore", "supabase", "prisma", "sequelize", "mongoose", "typeorm", "knex",
    "sqlalchemy", "hibernate",

    # Cloud & DevOps
    "aws", "azure", "gcp", "google-cloud", "heroku", "vercel", "netlify", "digitalocean",
    "docker", "kubernetes", "k8s", "terraform", "ansible", "jenkins", "circleci",
    "github-actions", "gitlab-ci", "travis-ci", "nginx", "apache", "linux", "ubuntu",
    "centos", "ci/cd", "cicd", "devops", "microservices",

    # Data Science / ML / AI
    "machine-learning", "deep-learning", "tensorflow", "pytorch", "keras", "scikit-learn",
    "sklearn", "pandas", "numpy", "matplotlib", "seaborn", "jupyter", "nlp",
    "computer-vision", "opencv", "transformers", "huggingface", "langchain", "llm",
    "generative-ai", "openai", "gpt", "bert", "data-science", "data-analysis",
    "data-engineering", "spark", "hadoop", "airflow", "kafka", "etl", "tableau",
    "power-bi", "powerbi", "excel",

    # Mobile
    "android", "ios", "react-native", "flutter", "swiftui", "xamarin", "ionic",
    "cordova", "expo",

    # Tools & Version Control
    "git", "github", "gitlab", "bitbucket", "svn", "jira", "confluence", "trello",
    "slack", "figma", "sketch", "adobe-xd", "photoshop", "illustrator",
    "postman", "swagger", "insomnia",

    # Testing
    "jest", "mocha", "chai", "cypress", "selenium", "playwright", "puppeteer",
    "pytest", "unittest", "junit", "testing", "unit-testing", "integration-testing",
    "tdd", "bdd",

    # Concepts & Methodologies
    "rest", "restful", "api", "apis", "graphql", "grpc", "websocket", "websockets",
    "oauth", "jwt", "authentication", "authorization", "security", "encryption",
    "agile", "scrum", "kanban", "oop", "functional-programming", "design-patterns",
    "solid", "mvc", "mvvm", "clean-architecture", "system-design", "dsa",
    "data-structures", "algorithms",
}


PRE_REPLACEMENTS = {
    # Java/TS Script mappings
    "java script": "javascript",
    "type script": "typescript",
    "react js": "reactjs",
    "node js": "nodejs",
    "vue js": "vuejs",
    "next js": "nextjs",
    "nuxt js": "nuxtjs",
    "my sql": "mysql",
    "postgre sql": "postgresql",
    "git hub": "github",
    "git lab": "gitlab",
    "power shell": "powershell",
    
    # DSA mappings (longest first to avoid partial replacement)
    "data structures & algorithms": "dsa",
    "data structures and algorithms": "dsa",
    "data structures": "dsa",
    "data-structures": "dsa",
    "algorithms": "dsa"
}


def normalize_text(text):
    """
    Normalize text for better skill matching.
    """
    # Insert space between lowercase→uppercase transitions (camelCase splitting)
    # This is necessary for PDFs that squash words together (e.g., "PythonDjango")
    text = re.sub(r'([a-z])([A-Z])', r'\1 \2', text)
    # Replace common separators with spaces
    text = re.sub(r'[•·|/\\]', ' ', text)
    # Collapse multiple spaces/newlines
    text = re.sub(r'\s+', ' ', text)
    text = text.lower().strip()
    
    # Unify synonyms and compound names before skill matching
    for source, target in PRE_REPLACEMENTS.items():
        text = text.replace(source, target)
        
    return text


def extract_skills_from_text(text):
    """Extract known skills from text using the curated dictionary."""
    text = normalize_text(text)
    found_skills = set()

    for skill in KNOWN_SKILLS:
        escaped = re.escape(skill)
        # Word-boundary equivalent that handles special chars like c++, c#, node.js
        pattern = r'(?<![a-z0-9])' + escaped + r'(?![a-z0-9])'
        if re.search(pattern, text):
            found_skills.add(skill)

    # Multi-word skills (spaces preserved after normalization)
    multi_word_skills = {
        "machine learning", "deep learning", "data science", "data analysis",
        "data engineering", "computer vision", "natural language processing",
        "react native", "ruby on rails", "spring boot", "google cloud",
        "power bi", "unit testing", "integration testing", "system design",
        "design patterns", "clean architecture",
        "functional programming", "generative ai", "artificial intelligence",
        "web development", "full stack", "frontend development", "backend development",
        "software engineering", "project management", "version control",
        "continuous integration", "continuous deployment",
    }

    for skill in multi_word_skills:
        if skill in text:
            found_skills.add(skill)

    return found_skills


def compute_skill_score(jd_skills, resume_skills):
    """
    Compute a skill-based match score (0–100).
    Returns the percentage of JD skills found in the resume.
    If the JD has no detectable skills, returns 0.
    """
    if not jd_skills:
        return 0.0
    matching = jd_skills.intersection(resume_skills)
    return len(matching) / len(jd_skills) * 100


def analyze_resumes(jd_text, resumes_texts):
    if not resumes_texts:
        return []

    # --- TF-IDF semantic similarity (captures context beyond skill keywords) ---
    texts = [jd_text] + resumes_texts
    vectorizer = TfidfVectorizer(stop_words='english', ngram_range=(1, 2))
    tfidf_matrix = vectorizer.fit_transform(texts)
    tfidf_scores = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:])[0]

    # --- Skill-based matching ---
    jd_skills = extract_skills_from_text(jd_text)

    results = []
    for i, resume_text in enumerate(resumes_texts):
        resume_skills = extract_skills_from_text(resume_text)
        matching = jd_skills.intersection(resume_skills)
        missing = jd_skills - resume_skills

        skill_score = compute_skill_score(jd_skills, resume_skills)

        # If the JD has identifiable skills, score is purely based on skill match %
        if len(jd_skills) > 0:
            final_score = skill_score
        else:
            # Fallback to TF-IDF if the JD has no known technical skills
            tfidf_normalized = min(tfidf_scores[i] * 200, 100)
            final_score = tfidf_normalized

        results.append({
            "score": round(float(final_score), 2),
            "matching_skills": sorted(list(matching)),
            "missing_skills": sorted(list(missing))
        })

    return results
