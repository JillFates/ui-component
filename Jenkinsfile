node {
    def registry = 'tm-registry.transitionmanager.net/tds-ci'
    def name = 'ui-components'
    def image
    def version


    stage('Checkout') {
        checkout scm
    }

    stage('Test') {
        sh "npm run test"
    }

    stage('Lint') {
        sh "npm run lint"
    }

    stage('Build') {
        image = docker.build("${registry}/${name}:${env.BUILD_ID}". ".")
    }

    version = readFile("VERSION").trim()

    stage('Publish') {
        withCredentials([usernamePassword(credentialsId: , passwordVariable: 'NEXUS_PASSWORD', usernameVariable: 'NEXUS_USER')]) {
            sh "docker login -u $NEXUS_USER -p \"$NEXUS_PASSWORD\" ${registry}"
        }

        image.push("latest")
        image.push(version)
    }
}
