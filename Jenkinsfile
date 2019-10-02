def tmcontainers = [
  containerTemplate(
      name            : name,
      image           : 'tm-registry.transitionmanager.net/tds-ci/tm-node:latest',
      command         : 'cat',
      alwaysPullImage : true,
      ttyEnabled      : true
  )
]

def tmlabel = "UI-component-Build${BUILD_NUMBER}-${UUID.randomUUID().toString()}"

podTemplate (
    label: tmlabel,
    imagePullSecrets: ['tm-registry'],
    containers: tmcontainers,
    volumes: [
        hostPathVolume(hostPath: '/dev/shm', mountPath: '/dev/shm')
    ]
) {
    node(tmlabel) {
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

        if (env.BRANCH_NAME == 'develop')_{
            stage('Publish') {
                withCredentials([usernamePassword(credentialsId: 'd1920d69-59ad-45d6-b345-69c746c05794', passwordVariable: 'NEXUS_PASSWORD', usernameVariable: 'NEXUS_USER')]) {
                    sh "docker login -u $NEXUS_USER -p \"$NEXUS_PASSWORD\" ${registry}"
                }

                image.push("latest")
                image.push(version)
            }
        }
    }
}
